define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
  	'collections/fontsCollection',
	'text!templates/fontListTemplate.html'
], function($, _, Backbone, FontsCollection, fontListTemplate){

	var FontsListView = Backbone.View.extend({
		el: $("#page"),
		template: _.template(fontListTemplate),
		initialize: function(){
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
			this.$el.html(this.template({ fonts: this.collection.models }));
			return this;
		}
	});

	return FontsListView;
});
