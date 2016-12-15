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

		Categories.$inject = ['$resource', 'ENV'];

		function Categories ($resource, ENV) {
			var resourceURL = ENV.API_URL + "/categorizations/";
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
				},
				'update': { method:'PUT' }

			};


			return $resource(resourceURL + '/:id', {id: '@id'}, actions);
		}

	})();
