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
var dict = {};
var n=0;


  firebase.database().ref('q1/').on('value', snap => {
    let q1Info = snap.val();
    if(q1Info === null) {
      console.log('q1Info == null');
    }else{
    	for (var i in q1Info){
    		q1Info[i].numbers.map(function(x){
    			result.push(parseInt(x))
    		})
    }
           	for (var i=1; i<40; i++){result.push(i)}
        	result.sort(function(a, b){return a-b});
        	for (var i=0; i<result.length;i++){
        		if (result[i] !== result[i+1]){n++; dict[String(result[i])]=(n-1); n=0}
        		else{n++};
        	}

    }


  firebase.database().ref('q3/').push({
    dict
 });

})


app.get('/', function (req, res) {
  res.send(dict);
});


app.listen(5000, function () {
  console.log('app listening on port 5000!');
});
