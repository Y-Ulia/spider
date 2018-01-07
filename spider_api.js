// var mongoose= require("mongoose")
var express = require('express')
var app     = express()
var router  = express.Router()
var cheerio = require("cheerio")
var child_process = require('child_process')

router.get('/', function(req, res) {
	res.sendFile(__dirname+'/index.html');
})

router.get('/spider', function(req, res) {
    var url     = req.query.url,
    	query   = decodeURIComponent(req.query.code),
    	content = '',
    	t       = 0;
    if(!url&&!query) {
    	res.send({
    		state: 1,
    		data: '缺少参数'
    	})
    	return
    }
    var phantom = child_process.spawn('phantomjs', ['spider.js', url]);

    phantom.stdout.setEncoding('utf8');
	phantom.stdout.on('data', function(data){
		content += data.toString();
	});
	phantom.stdout.on('close', function() {
		console.log('---PathtomJs子进程已关闭！');
	});
	phantom.on('exit', function(code){
		switch (code){
			case 1:
				console.log('加载失败: '+ url);
				res.send('加载失败: '+ url);
			break;
			case 2:
				console.log('加载超时: '+ url);
				res.send('加载超时: '+ url);
			break;
			default:
				console.log('加载成功: '+ url);
				var $    = cheerio.load(content);
				var data = $(query).html().replace(/[\r\n]/g, '');
				res.send({
					state: 0,
					data: data
				});
			break;
		}
	})
})

app.use(router)
app.listen(8080)