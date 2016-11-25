'use strict';

/**
 * @ngdoc function
 * @name app.route:sessionRoute
 * @description
 * # sessionRoute
 * Route of the app
 */

angular.module('session')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.session', {
				url:'/session',
				templateUrl: 'app/modules/session/session.html',
				controller: 'SessionCtrl',
				controllerAs: 'vm'
			});

		
	}]);
