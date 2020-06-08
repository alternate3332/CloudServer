var http = require("http");
var server = http.createServer();
var fs = require("fs");

server.on("request", function(req, res){
	if(req.url == "/"){
		fs.readFile(__dirname+"/index.html", 'utf-8', function(err, data){			if(err){
				res.writeHead(404, {
					'Content-Type': "text/plain"
				});	
				res.write("nodata");
				return res.end();
			}
			res.writeHead(200, {
				'Content-Type': "text/html"
			});	
			res.write(data);
			return res.end();
		});
	}

	if(req.method == "POST"){
		req.data = "";
		req.on("readable", function(){
			req.data += req.read() || "";
		});

		req.on("end", function(){
			var data = JSON.parse(req.data);
			try{
				fs.mkdirSync(__dirname+"/uploads");
			} catch(e){
			}

			var decodedData = new Buffer.from(data.data.split("base64,")[1], "base64");
			fs.writeFileSync("uploads/"+data.name, decodedData, 'utf-8', function(err){
			});

			res.writeHead(200, {
				'Content-Type': "text/html"
			});	
			return res.end();
		});
	}

});

server.listen(8000, "192.168.1.7");
console.log("listening ...");