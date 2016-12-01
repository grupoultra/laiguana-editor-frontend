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

			return $resource(resourceURL + '/:id', {id: '@id'}, {
				createCategory: {
					url: resourceURL + '/:id/categories',
					method: 'POST',
					params: {id: '@id'}
				}
			});
		}

	})();
