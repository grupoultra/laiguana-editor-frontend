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

		Users.$inject = ['$resource', 'ENV'];

		function Users ($resource, ENV) {
			var resourceURL = ENV.API_URL + "/editorUsers";

			var actions = {
				'update': { method:'PUT' }
			};

			return $resource(resourceURL + '/:id', {id: '@id'}, actions);
		}

	})();
