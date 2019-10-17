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
var post=[];
var b1, b2, b3, b4, b5, serial, amount, date;

var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;



app.listen(5000, function () {
  console.log('app listening on port 5000!');
});

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// var request = require('request');

driver.get('http://www.taiwanlottery.com.tw/lotto/DailyCash/history.aspx');
driver.findElement(By.xpath("//*[@id='D539Control_history1_radYM']")).click();
for (var y=103; y<106;y++){
driver.findElement(By.xpath("//select[@id='D539Control_history1_dropYear']/option[text()='"+y+"']")).click();
for (var n=1; n<13; n++){
    n = n.toString();
	driver.findElement(By.xpath('//select[@id="D539Control_history1_dropMonth"]/option[text()="'+n+'"]')).click();
	driver.findElement(By.xpath('//*[@id="D539Control_history1_btnSubmit"]')).click();
	driver.findElements(By.className("td_hm")).then(function(elements){
	    elements.reverse().forEach(function (element) {
	        element.getText().then(function(ele){
	            // post.push(text);

						b1 = ele.split(" ")[11].trim();
						b2 = ele.split(" ")[12].trim();
						b3 = ele.split(" ")[13].trim();
						b4 = ele.split(" ")[14].trim();
						b5 = ele.split(" ")[15].trim().slice(0,2);

						serial = ele.split(" ")[2].trim().slice(3);
						amount = ele.split(" ")[21].trim().slice(3,13);
						date = ele.split(" ")[3].trim().slice(3);




	        			console.log(serial);
	        			console.log(b1,b2,b3,b4,b5);
	        			console.log(amount);
	        			console.log(date);

	      //   			  firebase.database().ref('q1/').push({
						 //    serial: serial,	
						 //    date: date,
						 //    numbers: [b1,b2,b3,b4,b5],
						 //    amount: amount,
						 // });




	        });
	    });
	});



    	
}//for n
}//for y

driver.quit();



// var url = 'http://www.taiwanlottery.com.tw/lotto/DailyCash/history.aspx'
// var date;
// var data = [];
// var request = require('request');

// request(url, function(err, res, body){

// var cheerio = require('cheerio');
// var $ = cheerio.load(body);
// console.log(body);
// }//request

// var ball;

// $($('table#D539Control_history1_dlQuery > tr > td > table ').get().reverse()).each(function(){
// 	ball = $(this).text();
// 	data.push(ball);
// });
// var result = data.map(function(ele){

// 	var b1 = ele.split("\r\n              ")[21].trim();
// 	var b2 = ele.split("\r\n              ")[22].trim();
// 	var b3 = ele.split("\r\n              ")[23].trim();
// 	var b4 = ele.split("\r\n              ")[24].trim();
// 	var b5 = ele.split("\r\n              ")[25].trim();

// 	var ballGroup=[];
// 	ballGroup.push(b1,b2,b3,b4,b5);

// 	var serial = ele.split("\r\n              ")[7].trim();
// 	var amount = ele.split("\r\n              ")[39].trim();
// 	var date = ele.split("\r\n              ")[9].trim();


 //  firebase.database().ref('q1/').push({
 //    serial: serial,	
 //    date: date,
 //    numbers: ballGroup,
 //    amount: amount,
 // });

// })


app.get('/', function (req, res) {
  res.send(post);
});

// })//request

