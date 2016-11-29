'use strict';

/**
 * @ngdoc function
 * @name app.route:articleRoute
 * @description
 * # articleRoute
 * Route of the app
 */

angular.module('articles')
	.config(['$stateProvider', function ($stateProvider) {

		$stateProvider
			.state('home.articles', {
				url:'/articles',
				templateUrl: 'app/modules/articles/articles.html',
				controller: 'ArticlesCtrl',
				controllerAs: 'vm'
			});


	}]);
