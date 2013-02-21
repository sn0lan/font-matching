// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/fonts/fontsListView',
  'views/homePageView',
], function($, _, Backbone, FontsList, HomePageView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'fonts': 'showAllFonts',
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:showAllFonts', function (actions) {
        var FontsListView = new FontsList();
        FontsListView.render(); 
    });

    app_router.on('route:defaultAction', function (actions) {
        var homePageView = new HomePageView();
        homePageView.render(); 
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
