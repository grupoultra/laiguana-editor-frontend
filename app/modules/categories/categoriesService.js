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
		.module('categories')
		.factory('CategoriesService', Categories);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Categories.$inject = ['$http'];

		function Categories ($http) {

		}

})();
