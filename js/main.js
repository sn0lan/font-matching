require.config({
	paths:{
		jquery : "vendor/jquery/jquery",
		underscore : "vendor/underscore-amd/underscore",
		backbone : "vendor/backbone-amd/backbone",
		templates: "../templates"
	}
});

require([
	'app'
], function(App){
	App.initialize();
});
