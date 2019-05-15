var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/nodedb',{ useNewUrlParser: true });
db.once('open',function(){
	console.log('连接成功');
});
db.on('error',function(err){
	throw err;
});

var userSchema = new mongoose.Schema({
	name:{type:String,unique:true},
	psw:String
});
//userSchema.methods.findByName=function(name,callback){
//	return this.model('user').find({name:name},callback);
//}
var userModel = db.model('last',userSchema);

module.exports = userModel;
