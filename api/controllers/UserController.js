/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
module.exports = {
	create : function(req,res,next){
		if(typeof req.param('username')=="undefined" || typeof req.param('password')=="undefined" || typeof req.param('email')=="undefined") 
			return res.redirect('/');
		//search by username
		User.findOne({'username':req.param('username')}, function(err, user1){
			if(err) return next(err);
			if(user1)
			{
				var requireLoginError = ['Sudah ada user dengan username tersebut'];
				  req.session.flash = {
				  	err: requireLoginError
				  }
				   return res.redirect('/auth/login');
			}
			//search by email
			User.findOne({'email':req.param('email')}, function(err, user2){
				if(err) return next(err);
				if(user2)
				{
					var requireLoginError = ['Sudah ada user dengan email tersebut'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
					  return res.redirect('/auth/login');
				}
				bcrypt.hash(req.param('password'), 10, function passwordEncrypted(err, encryptedPassword) {
				      if (err) return next(err);
				      var usrObj = {
						name : req.param('name'),
						username : req.param('username'),
						encryptedPassword : encryptedPassword,
						email : req.param('email'),
						admin : false,
						ticket : 0,
						saldo : 0,
						nohp : '',
						namabank:'',
						norek : '',
						namarek : '',
						pin : ''
				       }
				       User.create(usrObj, function(err,user){
				       	if(err) return next(err);
				       	if(req.param('ref')=='1')
				       		req.session.User = user;
				       	req.session.authenticated = true;
				       	return res.redirect('/user/home');
				       });
				});
			});
		});
	},
	registerasadmin : function(req,res,next){
		bcrypt.hash(req.param('password'), 10, function passwordEncrypted(err, encryptedPassword) {
		      if (err) return next(err);
		      var usrObj = {
				name : req.param('name'),
				username : req.param('username'),
				encryptedPassword : encryptedPassword,
				email : req.param('email'),
				admin : true,
				ticket : 1000,
				saldo : 0,
		       }
		       User.create(usrObj, function(err,user){
		       	if(err) return next(err);
		       	req.session.User = user;
		       	req.session.authenticated = true;
		       	return res.redirect('/user/home');
		       });
		});
	},
	logout : function(req,res,next){
		req.session.User = "";
		req.session.authenticated = false;
		return res.redirect('/');
	},
	login : function(req,res,next){
		User.findOne({ or : [ {username : req.param('email')}, { email: req.param('email') } ] }, function(err,user){
			if(err) return next(err);
			if(!user)
			{
				var requireLoginError = ['Tidak ada user dengan email/username tersebut'];
				  req.session.flash = {
				  	err: requireLoginError
				  }
				   return res.redirect('/auth/login');
			}
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if(err) return next(err);
				if(!valid)
				{
					var requireLoginError = ['Username / Password anda salah'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
					   return res.redirect('/auth/login');
				}
				req.session.User = user;
				req.session.authenticated = true;
				return res.redirect('/user/home');
			});
		});
	},
	updateticket : function(req,res,next){
		var str = req.param('ticket');
		for(var i=0;i<str.length;i++)
		{
			if(str[i]<'0' || str[i]>'9')
			{
				var requireLoginError = ['Harap isi jumlah tiket anda dengan angka....'];
				req.session.flash = {
					err: requireLoginError
				}
				return res.redirect('/user/home');
			}
		}
		User.update({'id':req.session.User.id}, {'ticket': req.param('ticket')}, function(err, user){
			if(err) return next(err);
			return res.redirect('/user/home');
		});
	},
	sendticket : function(req,res,next){
		User.findOne({'username': req.param('username')}, function(err,user){
			if(err) return next(err);
			if(!user) {
				var requireLoginError = ['Tidak ada user dengan username tersebut....'];
				  req.session.flash = {
				  	err: requireLoginError
				  }
				   return res.redirect('/user/home');
			}
			var str = req.param('ticket');
			for(var i=0;i<str.length;i++)
			{
				if(str[i]<'0' || str[i]>'9')
				{
					var requireLoginError = ['Harap isi jumlah tiket anda dengan angka....'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
					   return res.redirect('/user/home');
				}
			}
			var tmp = parseInt(req.param('ticket'));
			if(tmp>req.session.User.ticket)
			{
				var requireLoginError = ['Tiket anda kurang.. Harap diisi.....'];
				  req.session.flash = {
				  	err: requireLoginError
				  }
				   return res.redirect('/user/home');
			}
			User.update(user.id, {'ticket': tmp}, function(err, user){
				if(err) return next(err);
				User.update({'id':req.session.User.id}, {'ticket':req.session.User.ticket-tmp}, function(err,user1){
					if(err) return next(err);
					req.session.User.ticket -=tmp;
					return res.redirect('/user/home');
				});
			});
		});
	},
	index : function(req,res,next){
		if(req.session.User.admin)
			return res.redirect('/');
		else
			return next();
	},
	home : function(req,res,next) {
		res.view();
	},
	new : function(req,res,next){
		if(req.session.authenticated)
			return res.redirect('/user/home');
		else
			return res.view();
	},
	register : function(req,res,next){
		res.view();
	}
};

