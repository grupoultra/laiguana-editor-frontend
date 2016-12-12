(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('laiguana-editor')
		.config(configureBlock)
		.run(runBlock);

	configureBlock.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configureBlock($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


		$urlRouterProvider
			.otherwise('/dashboard');

	}

	runBlock.$inject = ['$rootScope', 'PermPermissionStore', 'PermRoleStore', 'AuthService'];

	function runBlock($rootScope, PermPermissionStore, PermRoleStore, AuthService) {
		'use strict';

		PermPermissionStore.definePermission('createArticle', function () { return true;});
		PermPermissionStore.definePermission('viewArticle', function () { return true;});
		PermPermissionStore.definePermission('updateArticle', function () { return true;});
		PermPermissionStore.definePermission('deleteArticle', function () { return true;});
		PermPermissionStore.definePermission('listArticles', function () { return true;});

		PermRoleStore
			.defineManyRoles({
				'LOGGEDIN': function () { return AuthService.isAuthenticated(); },
				'ADMIN': ['createArticle', 'viewArticle'],
				'EDITOR': ['createArticle'],
			});

		// return AuthService.isAuthenticated();

		console.log('AngularJS run() function...');
	}


})();
