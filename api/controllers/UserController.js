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
		User.findOne({'id':req.session.User.ticket}, function(err,user){
			if(user.ticket<=0)
			{
				var requireLoginError = ['Tiket anda kurang.. Anda tidak bisa mendaftarkan akun orang lain. Harap ditambah.....'];
					  req.session.flash = {
					  	err: requireLoginError
					}
				return res.redirect('/register');
			}
			if(req.param('name')=="" || req.param("username")=="" || req.param("password")=="" || req.param('email')=="" || req.param("nomorhp")=="" || req.param("rekening")=="" || req.param("bank")=="" || req.param("norek")=="" || req.param("namarek")=="" || req.param("pin")=="" || req.param("pin").length!=6 || (req.param("pin")!=req.param("pin2")))
			{
				var requireLoginError = ['Terjadi kesalahan dalam pemasukan data..'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
				return res.redirect('/register');
			}
			var tmp = req.param("pin");
			for(var i=0;i<tmp.length;i++)
			{
				if(tmp[i]<'0' && tmp[i]>'9')
				{
					var requireLoginError = ['PIN harus berisi 6 Angka'];
					req.session.flash = {
						err: requireLoginError
					}
					return res.redirect('/register');
				}
			}
			if(typeof req.param('username')=="undefined" || typeof req.param('password')=="undefined" || typeof req.param('email')=="undefined") 
			{
				var requireLoginError = ['Terjadi kesalahan dalam pemasukan data..'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
				return res.redirect('/register');
			}
			//search by username
			User.findOne({'username':req.param('username')}, function(err, user1){
				if(err) return next(err);
				if(user1)
				{
					var requireLoginError = ['Sudah ada user dengan username tersebut'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
					   return res.redirect('/register');
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
						  return res.redirect('/register');
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
							nohp : req.param('nomorhp'),
							namabank:req.param('bank'),
							norek : req.param('rekening'),
							namarek : req.param('namarek'),
							pin : req.param('pin')
					       }
					       User.create(usrObj, function(err,user3){
					       	if(err) return next(err);
					       	if(req.param('ref')=='1')
					       	{
						       	req.session.User = user3;
						       	req.session.authenticated = true;
						       	return res.redirect('/user/home');
					       	}
					       	else
					       	{
					       		User.update({'id':req.session.User.id}, {'ticket':user.ticket-1}, function(err,user4){
					       			if(err) return next(err);
					       			req.session.User.ticket -=1;
					       			var requireLoginError = ['Berhasil diregistrasi'];
								  req.session.flash = {
								  	err: requireLoginError
								}
					       			return res.redirect('/user/home');
					       		});
					       	}
					       });
					});
				});
			});
		});
	},
	history : function(req,res,next){
		if(!req.session.User.admin)
		{
			return res.redirect('/user/home');
		}
		Jodoh.find({sort : 'createdAt DESC'},function(err,jodohs){
			if(err) return next(err);
			res.view({
				jodohs : jodohs
			});
		});
	},
	phgh : function(req,res,next){
		Ph.find({'idUser':req.session.User.id}, {sort : 'createdAt DESC'}, function(err,phs){
			if(err) return next(err);
			Gh.find({'idUser':req.session.User.id}, {sort : 'createdAt DESC'}, function(err,ghs){
				if(err) return next(err);
				Jodoh.find({'uph':req.session.User.username}, function(err, jdhuphs){
					User.find(function(err,users){
						Jodoh.find({'ugh':req.session.User.username}, function(err, jdhughs){
							res.view({
								phs : phs,
								ghs : ghs,
								jdhughs : jdhughs,
								jdhuphs : jdhuphs,
								users:users
							});
						});
					});
					
				});
				
			});
		});
	},
	pleasehelp : function(req,res,next){
		var usrObj = {
			idUser : req.session.User.id,
			verification : false,
			nominal : 1000000,
			username : req.session.User.username,
		}
		Ph.find({'idUser':req.session.User.id}, function(err,phs){
			for(var i=0;i<phs.length;i++)
			{
				if(!phs[i].verification)
				{
					var requireLoginError = ['Anda sudah memilih PH...'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
					   return res.redirect('/user/phgh');
				}
			}
			Gh.find({'idUser':req.session.User.id}, function(err,ghs){
				for(var i=0;i<ghs.length;i++)
				{
					if(!ghs[i].verification)
					{
						var requireLoginError = ['Anda sudah memilih GH...'];
						  req.session.flash = {
						  	err: requireLoginError
						  }
						   return res.redirect('/user/phgh');
					}
				}
				Ph.create(usrObj, function(err,ph){
					if(err) return next(err);
					return res.redirect('/user/phgh');
				});
			});
		});
		
	},
	list : function(req,res,next){
		if(!req.session.User.admin){
			return res.redirect('/user/home');
		}
		Ph.find({sort : 'createdAt DESC'}, function(err,phs){
			if(err) return next(err);
			Gh.find({sort : 'createdAt DESC'}, function(err,ghs){
				if(err) return next(err);
				res.view({
					phs : phs,
					ghs : ghs
				});
			});
		});
	},
	gethelp : function(req,res,next){
		var usrObj = {
			idUser : req.session.User.id,
			verification : false,
			nominal : 1000000,
			username : req.session.User.username
		}
		Ph.find({'idUser':req.session.User.id}, function(err,phs){
			for(var i=0;i<phs.length;i++)
			{
				if(!phs[i].verification)
				{
					var requireLoginError = ['Anda sudah memilih PH...'];
					  req.session.flash = {
					  	err: requireLoginError
					  }
					   return res.redirect('/user/phgh');
				}
			}
			Gh.find({'idUser':req.session.User.id}, function(err,ghs){
				for(var i=0;i<ghs.length;i++)
				{
					if(!ghs[i].verification)
					{
						var requireLoginError = ['Anda sudah memilih GH...'];
						  req.session.flash = {
						  	err: requireLoginError
						  }
						   return res.redirect('/user/phgh');
					}
				}
				User.findOne({'id':req.session.User.id}, function(err,user){
					if(err) return next(err);
					if(user.ticket<=0)
					{
						var requireLoginError = ['Tiket anda kurang... Harap ditambahkan....'];
								  req.session.flash = {
								  	err: requireLoginError
								  }
						return res.redirect('/user/phgh');
					}
					Gh.create(usrObj, function(err,gh){
						if(err) return next(err);
						User.update({'id':req.session.User.id}, {'ticket':user.ticket-1}, function(err,user1){
							if(err) return next(err);
							req.session.User.ticket-=1;
							return res.redirect('/user/phgh');
						});	
					});
				});
				
			});
		});
	},
	makerelation : function(req,res,next){
		if(!req.session.User.admin){
			return res.redirect('/user/home');
		}
		Jodoh.findOne({'ugh':req.param('ugh'), uph:req.param('uph')}, function(err, jodoh){
			if(err) return next(err);
			if(jodoh && !jodoh.confirmation){
				var requireLoginError = ['Anda sudah pernah membuat relasi jodoh ini...!!!!'];
				req.session.flash = {
					err: requireLoginError
				}
				return res.redirect('/user/list');	
			}
			Gh.findOne({'username':req.param('ugh')}, function(err,gh){
				if(err) return next(err);
				if(!gh){
					var requireLoginError = ['Tidak ada user dengan kriteria GH'];
					req.session.flash = {
						err: requireLoginError
					}
					return res.redirect('/user/list');	
				}
				Ph.findOne({'username':req.param('uph')}, function(err,ph){
					if(err) return next(err);
					if(!ph){
						var requireLoginError = ['Tidak ada user dengan kriteria PH'];
						req.session.flash = {
							err: requireLoginError
						}
						return res.redirect('/user/list');	
					}
					//Ph.update(ph.id, {'verification':true}, function(err,ph1){
						//Gh.update(gh.id, {'verification':true}, function(err,gh1){
							var usrObj = {
								ugh : req.param('ugh'),
								uph : req.param('uph'),
								nominal : req.param('nominal'),
								confirmation : false,
								comment : '',
								sendcomment : false,
							}
							Jodoh.create(usrObj, function(err,jodoh){
								if(err) return next(err);
								var requireLoginError = ['Berhasil menjodohkan...!!!!'];
								req.session.flash = {
									err: requireLoginError
								}
								return res.redirect('/user/list');
							});	
						//});
					//});
								
				});
			});
		});
	},
	confirmpayment : function(req,res,next){
		var usrObj = {
			id : req.param('id'),
		}
		Jodoh.findOne({'id':usrObj.id}, function(err,jodoh){
			if(err) return next(err);
			Ph.update({'username': jodoh.uph}, {'verification':true}, function(err,ph){
				if(err) return next(err);
				Gh.update({'username':jodoh.ugh}, {'verification':true}, function(err,gh){
					if(err) return next(err);
					Jodoh.update(jodoh.id, {'confirmation':true}, function(err, jodoh){
						if(err) return next(err);
						return res.redirect('/user/phgh');
					});
				});
			});
		});
	},
	notify : function(req,res,next){
		var usrObj = {
			id : req.param('id'),
			comment : req.param('comment')
		}
		Jodoh.findOne({'id':usrObj.id}, function(err,jodoh){
			Jodoh.update(jodoh.id, {'comment' : usrObj.comment, 'sendcomment':true}, function(err, jodoh){
				if(err) return next(err);
				return res.redirect('/user/phgh');
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
			if(user.id==req.session.User.id)
			{
				var requireLoginError = ['Anda tidak bisa mengirimkan tiket ke diri anda sendiri.....'];
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
				var requireLoginError = ['Tiket anda kurang.. Harap ditambah.....'];
				  req.session.flash = {
				  	err: requireLoginError
				  }
				   return res.redirect('/user/home');
			}
			var tmp2 = tmp +user.ticket;
			User.update(user.id, {'ticket': tmp2}, function(err, user){
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
		User.findOne({'id':req.session.User.id}, function(err,user) {
			if(err) return next(err);
			res.view({
				user:user
			});
		});
	},
	new : function(req,res,next){
		if(req.session.authenticated)
			return res.redirect('/user/home');
		else
			return res.view();
	},
	register : function(req,res,next){
		res.view();
	},
	profile : function(req,res,next){
		User.findOne({'id':req.session.User.id}, function(err,user){
			res.view({
				user:user
			});
		});
	},
	editprofile : function(req,res,next){
		User.findOne({'id':req.session.User.id}, function(err,user){
			res.view({
				user:user
			});
		});
	},
	update : function(req,res,next){
		var pass;
		if(req.param('name')=="")
		{ 
			var requireLoginError = ['Harap isi nama anda'];
			req.session.flash = {
				err: requireLoginError
			}
			return res.redirect('/user/editprofile');
		}
		if(req.param('email')=="")
		{
			var requireLoginError = ['Harap isi email anda'];
			req.session.flash = {
				err: requireLoginError
			}
			return res.redirect('/user/editprofile');
		}
		if(req.param('namabank')=="")
		{ 
			var requireLoginError = ['Harap isi nama bank anda'];
			req.session.flash = {
				err: requireLoginError
			}
			return res.redirect('/user/editprofile');
		}
		if(req.param('norek')=="")
		{ 
			var requireLoginError = ['Harap isi nomor rekening anda'];
			req.session.flash = {
				err: requireLoginError
			}
			return res.redirect('/user/editprofile');
		}
		if(req.param('namarek')=="")
		{ 
			var requireLoginError = ['Harap isi nama rekening anda'];
			req.session.flash = {
				err: requireLoginError
			}
			return res.redirect('/user/editprofile');
		}
		User.findOne({'email':req.param('email')}, function(err,user){
			if(err) return next(err);
			if(user && user.id!=req.session.User.id) {
				var requireLoginError = ['Sudah ada user dengan email tersebut'];
						  req.session.flash = {
						  	err: requireLoginError
						 }
				return res.redirect('/user/editprofile');
			}
			if(req.param('pin')=="" || req.param("pin").length!=6)
			{
				var requireLoginError = ['PIN harus berisi 6 Angka'];
						  req.session.flash = {
						  	err: requireLoginError
						 }
				return res.redirect('/user/editprofile');
			}
			var tmp = req.param("pin");
			for(var i=0;i<tmp.length;i++)
			{
				if(tmp[i]<'0' && tmp[i]>'9')
				{
				var requireLoginError = ['PIN harus berisi 6 Angka'];
						  req.session.flash = {
						  	err: requireLoginError
				}
				return res.redirect('/user/editprofile');
				}
			}
			if(req.param('oldpass')=="" || req.param('newpass')=="" )
			{
				pass=req.session.User.encryptedPassword;
				var usrObj = {
					name : req.param('name'),
					nohp : req.param('nohp'),
					email : req.param('email'),
					namarek : req.param('namarek'),
					norek : req.param('norek'),
					namabank : req.param('namabank'),
					pin : req.param('pin'),
					encryptedPassword : pass
				}
				User.update({'id':req.session.User.id}, usrObj, function(err,user){
					if(err) return next(err);
					var requireLoginError = ['Profil anda berhasil diedit'];
							  req.session.flash = {
							  	err: requireLoginError
							 }
					return res.redirect('/user/profile');
				});
			}
			else
			{
				bcrypt.compare(req.param('oldpass'), req.session.User.encryptedPassword, function(err, valid) {
					if(err) return next(err);
					if(!valid) {
						var requireLoginError = ['Password lama salah....'];
						  req.session.flash = {
						  	err: requireLoginError
						 }
					   return res.redirect('/user/editprofile');
					}
					if(req.param('newpass')!=req.param('newpass2'))
					{
						var requireLoginError = ['Password dengan konfirmasi password tidak sama'];
							  req.session.flash = {
							  	err: requireLoginError
							 }
						return res.redirect('/user/profile');
					}
					bcrypt.hash(req.param('newpass'), 10, function passwordEncrypted(err, encryptedPassword) {
						if(err) return next(err);
						pass = encryptedPassword;
						var usrObj = {
							name : req.param('name'),
							nohp : req.param('nohp'),
							email : req.param('email'),
							namarek : req.param('namarek'),
							norek : req.param('norek'),
							namabank : req.param('namabank'),
							pin : req.param('pin'),
							encryptedPassword : pass
						}
						User.update({'id':req.session.User.id}, usrObj, function(err,user){
							if(err) return next(err);
							var requireLoginError = ['Profil anda berhasil diedit'];
									  req.session.flash = {
									  	err: requireLoginError
									 }
							return res.redirect('/user/profile');
						});
					});
				});
			}
		});
	}

};

