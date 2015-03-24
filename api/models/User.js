/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	username : 'string',
  	encryptedPassword : 'string',
  	nama : 'string',
  	email : 'string',
  	admin : {
  		type : 'boolean',
  		defaultsTo : false
  	},
  	ticket : 'integer',
  	saldo : 'integer',
  	encryptedId : 'string',
  	nohp : 'string',
  	namabank : 'string',
  	norek : 'string',
  	namarek : 'string',
  	pin : 'string'
  }
};

