'use strict';

/**
 * @ngdoc function
 * @name app.route:usersRoute
 * @description
 * # usersRoute
 * Route of the app
 */

angular.module('users')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('home.users', {
				url:'/users',
				templateUrl: 'app/modules/users/views/users.html',
				controller: 'UsersCtrl',
				controllerAs: 'vm'
			})
			.state('home.newuser', {
				url:'/users/new',
				templateUrl: 'app/modules/users/views/new-user.html',
				controller: 'UsersCtrl',
				controllerAs: 'vm'
			})
			.state('home.user', {
				url:'/users/:id',
				templateUrl: 'app/modules/users/views/user.html',
				controller: 'UserCtrl',
				controllerAs: 'vm'
			});
	}]);
