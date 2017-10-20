const os = require('os');
const request = require('request');
const cheerio = require('cheerio');

const fs= require('fs');
const { sep } = require('path');
const hiddenPath = 'http://192.168.1.18/.hidden/';
var listArray = [];
var n = 1;

var iRead = function getReadMe(joinedPath) {

    request(joinedPath, (err, resp, body)=>{
	if(body){
	    $ = cheerio.load(body);
	    links = $('a');
	    var lastPart = joinedPath.substr(joinedPath.lastIndexOf('/') + 1);
	    if (lastPart == 'README'){
		if (body.indexOf('aide') < 0 &&
		    body.indexOf('Demande') < 0 &&
		    body.indexOf('toujours') < 0 &&
		    body.indexOf('craquer') < 0) {
		    console.log(body);
		    return;
		}
	    }
	    else {
		$(links).each(function(i, link){
		    if(i == 0)
			;
		    else{
			getReadMe(joinedPath + $(link).attr('href'));
		    }
		});
	    }
	}
    });
}

function getFirstList(callback) {

    request(hiddenPath, (err, resp, body)=>{

	$ = cheerio.load(body);
	links = $('a');
	$(links).each(function(i, link){
	    listArray.push($(link).attr('href'));
	});
	setInterval(()=>{
	    callback(hiddenPath + listArray[n]);
	    n++;
	}, 1000);
    });
    
    
}



getFirstList(iRead);
