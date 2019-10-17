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
var url = 'http://www.taiwanlottery.com.tw/lotto/DailyCash/history.aspx'
var date;
var data = [];
var request = require('request');

request(url, function(err, res, body){

var cheerio = require('cheerio');
var $ = cheerio.load(body);

var ball;

$($('table#D539Control_history1_dlQuery > tr > td > table ').get().reverse()).each(function(){
	ball = $(this).text();
	data.push(ball);
});
var result = data.map(function(ele){

	var b1 = ele.split("\r\n              ")[21].trim();
	var b2 = ele.split("\r\n              ")[22].trim();
	var b3 = ele.split("\r\n              ")[23].trim();
	var b4 = ele.split("\r\n              ")[24].trim();
	var b5 = ele.split("\r\n              ")[25].trim();

	var ballGroup=[];
	ballGroup.push(b1,b2,b3,b4,b5);

	var serial = ele.split("\r\n              ")[7].trim();
	var amount = ele.split("\r\n              ")[39].trim();
	var date = ele.split("\r\n              ")[9].trim();


 //  firebase.database().ref('q1/').push({
 //    serial: serial,	
 //    date: date,
 //    numbers: ballGroup,
 //    amount: amount,
 // });

})


app.get('/', function (req, res) {
  res.send(result);
});

})//request

app.listen(5000, function () {
  console.log('app listening on port 5000!');
});
