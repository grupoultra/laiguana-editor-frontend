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
		.factory('UsersModel', Users);

		Users.$inject = ['$resource'];

		function Users ($resource) {
			var BaseURL = "http://localhost:3000/api";
			var resourceURL = BaseURL + "/Users";

			return $resource(resourceURL + '/:id');
		}

	})();
