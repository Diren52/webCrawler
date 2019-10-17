var firebase = require("firebase");

// Leave out Storage
//require("firebase/storage");

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAvcpURPx5O22GQJHiJUc8yT32PaXLS19U",
    authDomain: "webcrawl-ae6ad.firebaseapp.com",
    databaseURL: "https://webcrawl-ae6ad.firebaseio.com",
    projectId: "webcrawl-ae6ad",
    storageBucket: "webcrawl-ae6ad.appspot.com",
    messagingSenderId: "494351860955"
  };
  firebase.initializeApp(config);

var express = require('express');
var app = express();
var result=[];

var dict = [];

firebase.database().ref('q1/').on('value', snap => {
    let q1Info = snap.val();
    if(q1Info === null) {
      console.log('q1Info == null');
    }else{
    	for (var i in q1Info){
          result[String(q1Info[i].date)] = [q1Info[i].numbers, q1Info[i].serial];
      }//for 
    console.log(result);
    }//else


for (var key in result){

    var test = [];
  for(var n=0; n<4;n++){


    if (parseInt(result[key][0][n])+1 == parseInt(result[key][0][n+1])){
      if (test.indexOf(result[key][0][n])== -1) test.push(result[key][0][n]);
      if (test.indexOf(result[key][0][n+1])== -1) test.push(result[key][0][n+1])
    }

  }//for
     if (test.length >0) dict.push({'serial': result[key][1],'date': key, 'numbers': test});

}//for


  firebase.database().ref('q5/').push({
    dict
 });

 });//firebase



app.get('/', function (req, res) {
  res.send();
});


app.listen(5000, function () {
  console.log('app listening on port 5000!');
});
