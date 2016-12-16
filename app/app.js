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
		'lfNgMdFileInput',
		'ngMdIcons',
		'ngCookies',
		'ngAnimate',
		'ngTouch',
		'ngSanitize',
		'ui.router',
		'ngLodash',
		'restangular',
		'home',
		'session',
		'application',
		'categories',
		'models',
		'articles',
		'users',
		'ENV',
		'permission',
		'permission.ui'
	]);

})();
