'use strict';
const axios = require('axios')
const image2base64 = require('image-to-base64');
const fs = require('fs')
var chrono = require('chrono-node');
var _=require("underscore")
var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount:{
    
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
},
  databaseURL: ""
});
var db = firebase.database();

exports.helloGCS = async (data, context) => {
  const file = data;
  console.log(`  Event ${context.eventId}`);
  console.log(`link ${file.mediaLink}`);
  console.log(`  Event Type: ${context.eventType}`);
  console.log(`  Bucket: ${file.bucket}`);
  console.log(`  File: ${file.name}`);
  console.log(`  Metageneration: ${file.metageneration}`);
  console.log(`  Created: ${file.timeCreated}`);
  
  

var price;
var confidence;
var regex = /[+-]?\d+(\.\d\d)/g;
var data;
var nameclass;
var score=[0,0,0,0,0,0]
// var encoded= await encode(file.bucket,file.name).catch((err) => console.log('error encode base64',err.message));

async function encode(Bucketname,file){
  return image2base64(`https://storage.cloud.google.com/${Bucketname}/${file}`) // you can also to use url
      .catch()
  }

async function Searchtotal(){
  //console.log(Urlimg)
  //console.log(Urlimg)
  //const response= await quickstart(Urlimg);
  var encoded=`https://storage.cloud.google.com/${file.bucket}/${file.name}`
	const Vision = require('@google-cloud/vision');
	const vision = new Vision.ImageAnnotatorClient();
  	const [textDetections] = await vision.textDetection(
    `gs://${file.bucket}/${file.name}`
  	);
  const [annotation] = textDetections.textAnnotations;
  var text = annotation ? annotation.description : '';
  //data=response.data.responses[0];
  console.log(textDetections)
  //var text=data.fullTextAnnotation.text;
  text = text.replace(/,/g, ".");
  var Words ={   
    "priority":{ "NAP":4, "PRIX":2,"TOTAL":3,"TOT":1 }
}

  while(!(_.isEmpty(Words.priority))){
     var max_key = _.invert(Words.priority)[_.max(Words.priority)];
      if (text.toUpperCase().indexOf(max_key)!=-1){
          console.log(max_key+" FOUNDED");
          price=DetectTotal(textDetections,max_key,text);
          break;
      }
      else {
          delete Words.priority[max_key]
      }
  }
  if (_.isEmpty(Words.priority)){
      price=DetectMax(textDetections);
  }
  console.log(confidence);
  var texte=text.replace(/\n/g, " Date ");
  var results = chrono.parse(texte);
  console.log('date =',results[0].text); 
  var typefact=classifier(textDetections)
  var ref = db.ref("/eline");
	ref.push(
  {	  Nomfichier:file.name,
      Prix:price,
      Date:results[0].text,
      classe:typefact,
      confidenceLevel:confidence
      
  }
  ).catch((err)=>(console.log(err.message))); 
  return ('date = '+results[0].text+'\n prix='+price+'\n classe='+typefact +"\n confidence level="+confidence)
}
function DetectTotal(file1,word,text){
  var location=[]
  var xword;
  for (var key=0;key<file1.textAnnotations.length;key++) { // find all Y of words=total
      if ((file1.textAnnotations[key].description).toUpperCase()==word) {
          var starty2,starty1;
          xword=file1.textAnnotations[key].boundingPoly.vertices[0].x;
          var marge=file1.textAnnotations[key].boundingPoly.vertices[3].y-file1.textAnnotations[key].boundingPoly.vertices[0].y
          if (file1.textAnnotations[key].boundingPoly.vertices[3].y>file1.textAnnotations[key].boundingPoly.vertices[2].y)
          { starty2=file1.textAnnotations[key].boundingPoly.vertices[3].y;}
          else {starty2=file1.textAnnotations[key].boundingPoly.vertices[2].y}
          for (var i=starty2-(marge/2);i<starty2+(marge/2);i=i+0.5){
          location.push(i)}}}
  var assembledstrings="";
  for (var key=1;key<file1.textAnnotations.length;key++) {
      for (var i=0;i<location.length;i++){
      if ((file1.textAnnotations[key].boundingPoly.vertices[3].y==location[i]) &&(file1.textAnnotations[key].boundingPoly.vertices[0].x>xword))  {
          assembledstrings=assembledstrings.concat(file1.textAnnotations[key].description)
      }}}
  console.log("assembledstring=",assembledstrings)
  assembledstrings=assembledstrings.replace(/,/g,".")
  var floatsA = assembledstrings.match(regex);
  if ((floatsA==null ) || (assembledstrings=="")){return DetectMax(file1,text)}// if there is no total with word searched
  else {
  floatsA.map(function(v) { return parseFloat(v); });
  console.log(floatsA);
  console.log(Math.max(...floatsA));
  if(DetectMax(file1,text)==Math.max(...floatsA)){confidence=0.9;}
  else{confidence=0.8;}
  return (Math.max(...floatsA))
  
}}

function DetectMax(file1){
  var ch=file1.fullTextAnnotation.text;
  ch=ch.replace(/,/g,".")
  //console.log(ch)
  var floatsB=ch.match(regex);
  if (floatsB==null){return null}else{
  floatsB = floatsB.map(function(v) { return parseFloat(v); });
  confidence=0.6;
  console.log(floatsB);
  console.log(Math.max(...floatsB));
  return (Math.max(...floatsB))}
}


function classifier (data){
    var classInv = {
    "topics":[
        {
            "Restaurant":["café","jus","resto","chicken","pizza","sandwich","frite","glace","table","couvert","eau","burger","food","boisson","plat","repas","restau","dessert"]
        },
        {
            "Hôtel":["room","chambre","nuit","hôtel","reception","étage","repas","appartement","residence","jour"]
        },
        {
            "Train":["train","station","arrivé","métro","classe","depart","gare","banlieue","cabine","arrêt"]
        },
        {
            "Avion":["aéroport","départ","arrivé","classe","direct","escale","repas","air","vol","passeport","avion"]
        },
        {
            "Parking":["voiture","matricule","parking","véhicule","parc","place"]
        },
        {
            "Péage":["péage","véhicule","autoroute"]
        }
    ],
    "names":["Restaurant","Hôtel","Train","Avion","Parking","Péage"]

}
    //console.log(classInv)
    var ch=data.fullTextAnnotation.text;
  	var i;var j;
    for (i=0;i<classInv.topics.length;i++){
        for(j=0;j<classInv.topics[i].length;j++){
            if (ch.toLowerCase().indexOf((topics[i])[j])!=-1){
                score[i]++;
            }
        }
    }
    console.log(classInv.names[score.indexOf(Math.max(...score))]);
    nameclass=classInv.names[score.indexOf(Math.max(...score))]
    return nameclass
}

var reply= await Searchtotal().catch((err)=> console.log(err.message))
console.log(reply)
};