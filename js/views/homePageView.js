define([
	// These are path alias that we configured in our bootstrap
	'jquery',     // lib/jquery/jquery
	'underscore', // lib/underscore/underscore
	'backbone',    // lib/backbone/backbone
  	'collections/fontsCollection',
	'text!templates/homePageTemplate.html'
], function($, _, Backbone, FontsCollection, homePageTemplate){

	var HomePageView = Backbone.View.extend({
		el: $("#page"),
		template: _.template(homePageTemplate),
		initialize: function(){
		},

		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});

	return HomePageView;
});
