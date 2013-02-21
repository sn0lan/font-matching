//Filename: boilerplate.js

define([
	'underscore', // lib/underscore/underscore
	'backbone'    // lib/backbone/backbone
], function(_, Backbone){

	var FontModel = Backbone.Model.extend({
		defaults: {
			"id": "",
			"family_name": "",
			"is_monocase": "",
			"family_urlname": "",
			"foundry_name": "",
			"foundry_urlname": "",
			"font_filename": "",
			"classification": "",
			"family_count": ""
		}

	});
	return FontModel;
});
