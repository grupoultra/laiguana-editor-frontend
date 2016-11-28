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
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Categories.$inject = ['$resource'];

		function Categories ($resource) {
			return $resource('http://localhost:3000/api/categorizations/:id')
		}

	})();
