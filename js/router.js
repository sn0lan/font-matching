// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/fonts/fontsListView',
  'views/fonts/fontCompareView',
  'views/homePageView',
], function($, _, Backbone, FontsList, FontCompareView) {
  
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
        var fontCompareView = new FontCompareView();
        fontCompareView.render(); 
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
