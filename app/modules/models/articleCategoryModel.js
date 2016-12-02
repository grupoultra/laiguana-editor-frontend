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

		ArticleCategory.$inject = ['$resource'];

		function ArticleCategory ($resource) {
			var BaseURL = "http://localhost:3000/api";
			var resourceURL = BaseURL + "/ItemCategorizations";

			return $resource(resourceURL + '/:id');
			// return $resource(resourceURL + '/:id', {id: '@id'});
		}

	})();
