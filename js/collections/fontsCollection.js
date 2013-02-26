//Filename: boilerplate.js

define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
	'models/fontModel'
], function($, _, Backbone, FontModel){
	var FontsCollection = Backbone.Collection.extend({

		model: FontModel,
		initialize: function(models, options){},
		url: 'js/vendor/fonts.html',
		
		parse: function(response){
			return response;
		}

	});
	
	return FontsCollection;
});
