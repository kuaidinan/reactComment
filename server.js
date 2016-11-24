var express=require('express'),
	app=express(),
	fs=require('fs'),
	path=require('path'),
	bodyparser=require('body-parser');

var FILEPATH=path.join(__dirname,'comment.json');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set('port',process.env.PORT||'3000');

//访问文件接口
app.get('/api/comment',function(req,res){
		fs.readFile(FILEPATH,function(error,data){
			if(error){
				console.log(error);
				process.exit(1);
			}
			res.json(JSON.parse(data));
		});
});
//写文件的接口
app.post('/api/modifyComment',function(req,res){
	console.log(req.body);
	fs.readFile(FILEPATH,function(error,data){
		var comments=JSON.parse(data);
		if(error){
			console.log(error);
			process.exit(1);
		}
		var comment={
			"id":Date.now(),
			"author":req.body.author,
			"comment":req.body.comment
		};
		comments.push(comment);
		fs.writeFile(FILEPATH,comments,function(error){
			if(error){
				console.log(error);
				process.exit(1);
			}
			console.log(comments);
			res.json(comments);
		})
	})
});
//设置静态页面
app.use('/',express.static(path.join(__dirname,'/www')));

app.listen(app.get('port'),function(){
	console.log('myserve is start port is %s',app.get('port'));
});