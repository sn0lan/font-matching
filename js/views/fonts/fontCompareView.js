define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
  	'collections/fontsCollection',
	'text!templates/homePageTemplate.html'
], function($, _, Backbone, FontsCollection, fontCompareTemplate){

	var FontCompareView = Backbone.View.extend({
		el: $("#page"),
		template: _.template(fontCompareTemplate),
		events: {
			'click .new': function(e){
				e.preventDefault();
				this.render();
			},

			'click .yes': function(e){
				e.preventDefault();
			},

			'click .no': function(e){
				e.preventDefault();
			},
		},
		initialize: function(){
			_.bindAll(this, 'render', 'render');
			that = this;
			var onDataHandler = function(collection, items){
				that.render();
			}

			that.collection = new FontsCollection([]);
			that.collection.fetch({ 
				error: function(){					
					console.log("Something seems to be wrong :s");
				},
				success: onDataHandler, 
				dataType: "json" 
			});

		},

		render: function(){
			var FontsForView = this.fontsForView();
			this.$el.html(this.template({ fonts: FontsForView }));
			return this;
		}, 

		randomFont: function(){	
			var fonts = this.collection.models;
			var random_font = fonts[Math.floor(Math.random() * fonts.length)];
			return random_font;
		},

		fontsForView: function(){
			var fontsArray = [];
			fontsArray.push(this.randomFont());
			fontsArray.push(this.randomFont());
			return fontsArray;
		},

	});

	return FontCompareView;
});
