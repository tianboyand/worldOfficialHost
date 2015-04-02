/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login : function(req,res,next){
		if(req.session.authenticated)
			return res.redirect('/user/register');
		else
			res.view();
	}
};

