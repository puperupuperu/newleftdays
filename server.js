var port = process.env.PORT || 8080,
	http = require('http'),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

http.createServer(function(request,response){
	if (request.url ==='/'){
		request.url = '/leftdays.html';
	}
	var x = url.parse(request.url,true);
	if (x.pathname === "/api") { 
      procAPI(x, response, request);
	}
	var fullpath = path.resolve(__dirname,'.'+x.pathname);
	if (fs.existsSync(fullpath)){
		var ext = path.extname(fullpath).toLowerCase();
		if(ext.match(/\.(png|jpg|jpeg|gif|html|css|js)$/)){
		   var strm = fs.createReadStream(fullpath);
			strm.pipe(response);
		} else {
			response.writeHead(404,{'Content-type':'text/plain'});
			response.end('404 not found');
		}
	} else {
			response.writeHead(404,{'Content-type':'text/plain'});
			response.end('404 not found');		
	}
}).listen(port);
console.log('start server');

function procAPI(x, response, request) {	
	
	response.writeHead(200, {'Content-Type':'text/html'});
				var X_YEAR = 2018,
				X_MONTH = 2,
				X_DAY = 10,
				X_HOUR = 0,
				X_MINITE = 0,
				X_SECOND = 0;
				var test = new Date(X_YEAR, X_MONTH - 1, X_DAY, X_HOUR, X_MINITE, X_SECOND);
				
				var now = new Date();		
				var rest = test.getTime()- now.getTime();
				var sec = Math.floor(rest / 1000 ) % 60;
				var min = Math.floor(rest / 1000 / 60 ) % 60;
				var hour = Math.floor(rest / 1000 / 60 / 60) % 24;
				var day = Math.floor(rest / 1000 / 60 / 60 / 24) % 365 ;				
	
	response.write('<body style = "background-color:#AAF">' + '<div style = "margin:150px auto; text-align: center;">' + '<h2 style = "font-size:80px;">' + '第112回医師国家試験まで' + '</h2>' + '<br>'+ '<br>'+ '<p style = "font-size: 50px;">' + 'あと' + '<span style ="font-size:80px;">' + day + '</span>' + '日' + '<span style ="font-size:80px;"> ' + hour + '</span>' + '時間' + '<span style ="font-size:80px;">' + min + '</span>' + '分' + '<span style ="font-size:80px;">' + sec + '</span>' + '秒' + '</p>' + '</div>');
	response.end();
}