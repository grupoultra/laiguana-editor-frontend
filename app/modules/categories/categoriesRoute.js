'use strict';

/**
 * @ngdoc function
 * @name app.route:categoriesRoute
 * @description
 * # categoriesRoute
 * Route of the app
 */

angular.module('categories')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.categories', {
				url:'/categories',
				templateUrl: 'app/modules/categories/categories.html',
				controller: 'CategoriesCtrl',
				controllerAs: 'vm'
			});

		
	}]);
