'use strict';

/**
 * @ngdoc function
 * @name app.route:articleRoute
 * @description
 * # articleRoute
 * Route of the app
 */

angular.module('article')
	.config(['$stateProvider', function ($stateProvider) {
		
		$stateProvider
			.state('home.article', {
				url:'/article',
				templateUrl: 'app/modules/article/article.html',
				controller: 'ArticleCtrl',
				controllerAs: 'vm'
			});

		
	}]);
