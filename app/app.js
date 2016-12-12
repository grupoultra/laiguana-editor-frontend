(function() {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main modules of the application.
	 */

	angular.module('laiguana-editor', [
		'ngResource',
		'ngMessages',
		'ngAria',
		 'ui.bootstrap',
		 'ngMaterial',
		'ngMdIcons',
		'ngCookies',
		'ngAnimate',
		'ngTouch',
		'ngSanitize',
		'ui.router',
		'ngLodash',
		'home',
		'session',
		'application',
		'categories',
		'models',
		'articles',
		'users',
		'permission',
	]);

})();
