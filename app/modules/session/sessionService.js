(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:sessionService
	 * @description
	 * # sessionService
	 * Service of the app
	 */

  	angular
		.module('session')
		.factory('SessionService', Session);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Session.$inject = ['$http'];

		function Session ($http) {

		}

})();
