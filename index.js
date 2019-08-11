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
  "project_id": "elineproject-f3d17",
  "private_key_id": "e8c7d72be82ef730df4382a03226c2514c6cc01f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCeufDLiIyj0O9+\nNOl6yzZHA6p0jSo9oXwjhLCRNv38IB+w4UibBUtnYK/Zw7R1TOqIAzzXVl07/qcX\n3Bb5CEiGgCxc9DYzt5At+TwG3BfxLKefuzv+Ml3qPVfHzBAVO/ojBQdIrAb4GNjc\nNvoLLEVWP+Akf9/ESC3TU8OTgpPzIYx33nHf3aaQM5S8iFVJ6rKlJ07PtQEGSiRl\n8dvzBkds0TUnJuxURooKwj9NepvHA0JHUPlxM1id1kbjVSoTBkok6VJCD++hP3dP\nSsL/xa5Z63NV23cTM25tK+SUDJvGKwGdW1m2IsEwflQCtufPvPGk50Z/B0bDwmR0\nb781KsQLAgMBAAECggEAEZlXSBH3WhCIBWvTeXB/r6cJ5stiJBw8GeoT873vsl1T\ndja8aKfRIQC47sHCyADDvlnxjITAaK8HEt+t0mXnOLaMdLAFNH3FaDuKus37f5uu\naEkH0Vr/S8IKchY/sEMKrIhZsuaUDT0gCma0GboKZBJIBXQCOQ6xug0/EaN4SQxB\n3pFTi/bI24g9E2xBYGUJlF5DIvAr/xun92Mmf80pE4INJjOt7GEU8463szaf8p2E\nDMAa3FZFDP2zHIlShbvvsQBJ2Vsj5b0orAuXoLV9FEHhJayZsN1hkzZge8v2jW08\nPv7r9FDY2NLjXWXcG+R358JRoPy8P4DXGL7eG3H9hQKBgQDa/lSuHrnhvr/JNgn5\noW2QQPEBF1sfqnHHr8IkaPLyl8A/tw4Y2tygP/7AVE8Ebwi5Ucy5FRSsVi+waPV7\n0YBxkcxlQgI4K9juuh7Spl6hEoxcQSu1ZV32SWM22VqUQJj515r4EiplSv+0UXEv\nB+RFUDnNMH9vZvdb+JN5QVqc/QKBgQC5jHMpFXOSSXXjLT5woedfLzbC7H+dNrmM\n/jpcRv3c5yKD890kSksOvltPsmYn2W7k+Ip7tQS/XY4ZZxHodEX58JjRZGy5NO1l\n0inRpzRK7ESHrK2qRRMNwk3A8POmoASlR0TvyS4h0EKaQcdQ0z2Y26v2gQUukPvF\nQvuLkuQ3pwKBgQDF9xu9u3D1rWXaEsu5qkBNIye6gM6TNZVdmni6SVU2EBBuiKBp\nv4+qHa/BVXWI4IbWYCfdOD1T/SVnJ7qij6S5Bb/r2VwAQ0L7q6ypaFQq74WK8C7+\n7/+c4IKb1qiXVD31vP4OOv2wS7gT3XuftFaaggd+gdTxc/cwYOmPt5CeUQKBgCM5\nF09wRA08JsXme9jz0zFNjC66qIsWrWinhjqoO17o/bNg4tUVyWPWHQ1nB19/Nj7/\nM4LCXVFamDQYTdz73aDR3KC7WKxb8MkIeWnUPOgQK/45eIo/LJvLC+mZlBdIfzlE\n60A9x6UhnNMds5GTWDkhUmasHWi2myTaT1gynWI3AoGAOkn+lPNsaaDqYoXUyfKI\nm8oklWnZKJZxF4tHGFDQaC9SMqSs2YPGTvhnU9Dn/ECKYUr20IEsykGtTZtcEkzK\nbPGjUMovqcqpnIgQvRdtAWqtew0lUbWCTfKQw1xKjmxcCsyk5G+w+pyy9FgnGl4c\nt4/stDNDxHs8NaLtf87uogE=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-vc55i@elineproject-f3d17.iam.gserviceaccount.com",
  "client_id": "107473573193269935431",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vc55i%40elineproject-f3d17.iam.gserviceaccount.com"
},
  databaseURL: "https://elineproject-f3d17.firebaseio.com"
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