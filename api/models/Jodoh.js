/**
* Jodoh.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	ugh : 'string',
  	uph : 'string',
  	nominal : 'integer',
  	confirmation : {
  		type : 'boolean',
  		defaultsTo : false
  	},
  	comment : 'string',
  	sendcomment : {
  		type : 'boolean',
  		defaultsTo : false
  	}
  }
};

