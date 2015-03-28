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
  	sponsor : 'integer',
      manager : 'integer',
  	encryptedId : 'string',
  	nohp : 'string',
  	namabank : 'string',
  	norek : 'string',
  	namarek : 'string',
  	pin : 'string',
      add : {
          type : 'array',
          defaultsTo : []
      },
      team : {
          type : 'array',
          defaultsTo : []
      },
      ref : 'string'
  }
};

