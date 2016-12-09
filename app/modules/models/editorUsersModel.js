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
		.factory('EditorUsersModel', Users);

		Users.$inject = ['$resource'];

		function Users ($resource) {
			var BaseURL = "http://localhost:3000/api";
			var resourceURL = BaseURL + "/editorUsers";

			var actions = {
				'update': { method:'PUT' }
			};

			return $resource(resourceURL + '/:id', {id: '@id'}, actions);
		}

	})();
