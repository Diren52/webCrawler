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
var test = {};
var dict = {};

  firebase.database().ref('q1/').on('value', snap => {
    let q1Info = snap.val();
    if(q1Info === null) {
      console.log('q1Info == null');
    }else{
    	for (var i in q1Info){
    		result.push(q1Info[i].numbers)
    }//for 
   }//else





       for (var n=1; n<40; n++){
			if (n<10) n = '0'+n.toString();
			else n = n.toString();
			var stan = 0;
			var m=0;
			       for (var i=0; i<result.length-1;i++){


					if (i==0 && result[0].indexOf(n) !== -1 && result[1].indexOf(n)!== -1){
						m++;  
						stan = m;
						console.log(n+' is now '+m);

					}
		        	else if (i>0 && result[i].indexOf(n) !== -1 && result[i+1].indexOf(n) !== -1){
		        		if (result[i-1].indexOf(n)== -1) m=0;
		        		m++;        			
		        			if (m>stan){stan = m;}
		        			console.log(n+' is now '+m);
		        		}
			        if (stan == 0){dict[parseInt(n)] = 0; }
			        else dict[parseInt(n)] = stan;
			        console.log('dict is');
			        console.log(dict);
        		}//for

    }//for

      firebase.database().ref('q4/').push({
          dict
       });

 });//firebase






app.get('/', function (req, res) {
  res.send(result);
});


app.listen(5000, function () {
  console.log('app listening on port 5000!');
});
