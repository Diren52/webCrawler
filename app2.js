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
var sum=0;


  firebase.database().ref('q1/').on('value', snap => {
    let q1Info = snap.val();
    if(q1Info === null) {
      console.log('q1Info == null');
    }else{
    	for (var i in q1Info){
    		
    		result[String(q1Info[i].date)] = q1Info[i].amount;


    }//for 

    for (var y = 103; y<106; y++){
    	for (var num=1; num<10; num++){
    		sum=0;
    		console.log(num);

    		for (var key in result){
		    	console.log(result[key]);
		    	if (key.startsWith(y+"/0"+String(num))){
		    		sum += parseInt(result[key].split(",").join(""));
		    	}//if startswith

	    console.log(sum);
	    dict[String(y)+'0'+String(num)] = sum;

    }//for num
    }//for key

    	for (var num=0; num<3; num++){
    		sum=0;
    		console.log(num);

    		for (var key in result){
		    	console.log(result[key]);
		    	if (key.startsWith(y+"/1"+String(num))){
		    		sum += parseInt(result[key].split(",").join(""));
		    	}//if startswith

	    console.log(sum);
	    dict[String(y)+String(num+10)] = sum;

    }//for num
    }//for key
}//for y

     firebase.database().ref('q2/').push({
    	dict
	 });
    }//else




})//snap


app.get('/', function (req, res) {
  res.send();
});


app.listen(5000, function () {
  console.log('app listening on port 5000!');
});
