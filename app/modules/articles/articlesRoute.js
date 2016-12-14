'use strict';

/**
 * @ngdoc function
 * @name app.route:articleRoute
 * @description
 * # articleRoute
 * Route of the app
 */

angular
	.module('articles')
	.config(configBlock);

	configBlock.$inject = ['$stateProvider'];
	// configBlock.$inject = ['$stateProvider', 'ArticlesModel'];


	function configBlock($stateProvider) {

		$stateProvider
			.state('home.articles', {
				url:'/articles',
				templateUrl: 'app/modules/articles/views/articles.html',
				controller: 'ArticlesCtrl',
				controllerAs: 'vm',
				data: {
					permissions: {
						only: 'LOGGEDIN',
						redirectTo: "home.login"
					}
				}
			})
			.state('home.article', {
				url:'/article/:id',
				templateUrl: 'app/modules/articles/views/article.html',
				controller: 'ArticleCtrl',
				controllerAs: 'vm',
				data: {
					permissions: {
						only: 'canViewArticle',
						redirectTo: "home.articles"
					}
				}
			})
			.state('home.newarticle', {
				url:'/articles/new',
				templateUrl: 'app/modules/articles/views/new-article.html',
				controller: 'ArticlesCtrl',
				controllerAs: 'vm',
				data: {
					permissions: {
						only: 'LOGGEDIN',
						redirectTo: "home.login"
					}
				}
			})
			.state('home.editarticle', {
				url:'/articles/:id/edit',
				templateUrl: 'app/modules/articles/views/new-article.html',
				controller: 'ArticlesCtrl',
				controllerAs: 'vm',
				data: {
					permissions: {
						only: 'canViewArticle',
						redirectTo: "home.articles"
					}
				}
			});


	}
