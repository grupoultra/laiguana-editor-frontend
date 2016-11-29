(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:categoriesService
	 * @description
	 * # categoriesService
	 * Service of the app
	 */

	angular
		.module('models')
		.factory('CategoriesModel', Categories);

		Categories.$inject = ['$resource'];

		function Categories ($resource) {
			var BaseURL = "http://localhost:3000/api";
			var resourceURL = BaseURL + "/categorizations/";
			var actions = {

				'categories': {
					method: 'GET',
					url: resourceURL + 'categories',
					isArray: true
				},
				'zones': {
					method: 'GET',
					url: resourceURL + 'zones',
					isArray: true
				}
			};


			return $resource(resourceURL + '/:id', {id: '@id'}, actions);
		}

	})();
