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
				templateUrl: 'app/modules/categories/views/categories.html',
				controller: 'CategoriesCtrl',
				controllerAs: 'vm',
				data: {
					permissions: {
						only: ['isAdmin'],
						redirectTo: "home.login"
					}
				}
			})
			.state('home.newcategory', {
				url:'/categories/new',
				templateUrl: 'app/modules/categories/views/new-category.html',
				controller: 'CategoriesCtrl',
				controllerAs: 'vm',
				data: {
					permissions: {
						only: ['isAdmin'],
						redirectTo: "home.login"
					}
				}
			})
			.state('home.editcategory', {
				url:'/categories/:id/edit',
				templateUrl: 'app/modules/categories/views/new-category.html',
				controller: 'CategoriesCtrl',
				controllerAs: 'vm',
				data: {
					permissions: {
						only: ['isAdmin'],
						redirectTo: "home.login"
					}
				}
			});
	}]);
