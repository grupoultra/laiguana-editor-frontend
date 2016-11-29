(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:articleService
	 * @description
	 * # articleService
	 * Service of the app
	 */

  	angular
		.module('article')
		.factory('ArticleService', Article);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Article.$inject = ['$http'];

		function Article ($http) {

		}

})();
