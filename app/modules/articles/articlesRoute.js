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
			})
			.state('home.article', {
				url:'/article/:id',
				templateUrl: 'app/modules/articles/article.html',
				controller: 'ArticleCtrl',
				controllerAs: 'vm'
			})
			.state('home.newarticle', {
				url:'/articles/new',
				templateUrl: 'app/modules/articles/new-article.html',
				controller: 'ArticlesCtrl',
				controllerAs: 'vm'
			});


	}]);
