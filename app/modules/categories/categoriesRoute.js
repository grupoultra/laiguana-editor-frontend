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
			})
			.state('home.newcategory', {
				url:'/categories/new',
				templateUrl: 'app/modules/categories/new-category.html',
				controller: 'CategoriesCtrl',
				controllerAs: 'vm'
			});

		
	}]);
