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

	configureBlock.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'RestangularProvider', 'ENV'];

	function configureBlock($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, RestangularProvider, ENV) {
		RestangularProvider.setBaseUrl(ENV.API_URL);

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


		$urlRouterProvider
			.otherwise('/dashboard');

	}

	runBlock.$inject = ['$rootScope', 'PermPermissionStore', 'PermRoleStore', 'AuthService', 'authEvents', 'Restangular'];

	function runBlock($rootScope, PermPermissionStore, PermRoleStore, AuthService, authEvents, Restangular) {
		'use strict';

		PermPermissionStore.definePermission('isAdmin', function () { return AuthService.isAdmin();});

		PermPermissionStore.definePermission(
			'canViewArticle',
			function (permissionName, transitionProperties) {
				var filterObject = {'filter[include]': 'editorUser'};

				return Restangular
					.one('items', transitionProperties.toParams.id)
					.get(filterObject)
					.then(function(article){
						if(article.editorUserId !== parseInt(AuthService.getUserId())){
							throw authEvents.NOT_OWNER;
						};
					})
					.catch(function(err){
						throw(err);
					});

			}

		);

		PermRoleStore
			.defineManyRoles({
				'LOGGEDIN': function () { return AuthService.isAuthenticated(); },
				'ADMIN': ['createArticle', 'viewArticle'],
				'EDITOR': ['createArticle'],
			});

		console.log('AngularJS run() function...');
	}


})();
