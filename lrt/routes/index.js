var express = require('express');
var router = express.Router();
//var connect = require('../database/connect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//登录
router.route('/login').get(function(req, res) {
//	console.log(req.session.user);

  res.render('login', { title: '登录' });
}).post(function(req,res){
	var User = global.connect;
	var name1 = req.body.name;
	var psw1 = req.body.psw;
	User.findOne({'name':name1},function(err,result){
		if(err){
			res.send(404);
			console.log(err);
		}
		else{
			if(!result){
			//	req.session.error = '没有此账号';
				console.log('没有此账号');
				res.status(500).send({err:'no the name'});
			}
			else if(psw1 != result.psw){
		//		req.session.error = '密码错误';
				console.log('密码错误');
				res.status(500).send({err:'psw is wrong'});
			}
			else {
				console.log('登录成功');
				res.status(200).send({url:'home'});
				//res.render('home',{title:name1});
			}

		}

	})
})


//注册
router.route('/register').get(function(req, res) {
	//alert('get');
  res.render('register', { title: '注册' });
}).post(function(req,res){
	var User=global.connect;
	var name2 = req.body.name;
	var psw2 = req.body.psw;
	User.findOne({'name':name2,'psw':psw2},function(error,result){
		if(error){
			res.send(500);
			console.log('账号错误'+error);
		}
	//	else if(name2 == result){
	//		console.log(result.name);
	//	}
		else{
			User.create({
				name:name2,
				psw:psw2
			},function(error){
				if(error){
					console.log(error);
				}
				else{
					res.render('login',{title:'登录'});
					console.log('注册成功');
				}
			})
		}
	})
})


module.exports = router;
