(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:articlesService
	 * @description
	 * # articlesService
	 * Service of the app
	 */

	angular
		.module('models')
		.factory('ArticlesModel', Articles);

		Articles.$inject = ['$resource'];

		function Articles ($resource) {
			var BaseURL = "http://localhost:3000/api";
			var resourceURL = BaseURL + "/Items";
			return $resource(resourceURL + '/:id', {id: '@id', filter: '@filter', params: '@params'}, {
				createCategory: {
					url: resourceURL + '/:id/categories',
					method: 'POST',
					params: {id: '@id'}
				},
				addVideo: {
					url: resourceURL + '/:id/youtube-video',
					method: 'POST',
					params: {id: '@id'}
				},
				addTweet: {
					url: resourceURL + '/:id/tweet',
					method: 'POST',
					params: {id: '@id'}
				},
				deleteVideo: {
					url: resourceURL + '/:id/youtube-video/:itemID',
					method: 'DELETE',
					params: {id: '@id', itemID: '@itemID'}
				},
				deleteTweet: {
					url: resourceURL + '/:id/tweet/:itemID',
					method: 'DELETE',
					params: {id: '@id', tweetID: '@itemID'}
				},
				'update': { method:'PUT' }
			});

			// uploadImage: {
			// 	url: resourceURL + '/:id/uploadImage',
			// 		method: 'POST',
			// 		params: {id: '@id'},
			// 	headers:{'Content-Type':'application/json; charset=utf-8'}
			// }
		}

	})();
