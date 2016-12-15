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
		.factory('ArticleCategoryModel', ArticleCategory);

		ArticleCategory.$inject = ['$resource', 'ENV'];

		function ArticleCategory ($resource, ENV) {
			var resourceURL = ENV.API_URL + "/ItemCategorizations";

			return $resource(resourceURL + '/:id');
			// return $resource(resourceURL + '/:id', {id: '@id'});
		}

	})();
