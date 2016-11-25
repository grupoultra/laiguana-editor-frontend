(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:sessionCtrl
	* @description
	* # sessionCtrl
	* Controller of the app
	*/

  	angular
		.module('session')
		.controller('SessionCtrl', ['$scope', '$rootScope', 'authEvents', 'AuthService', function($scope, $rootScope, AUTH_EVENTS, AuthService){
			/*jshint validthis: true */
			var vm = this;

			$scope.credentials = {
				username: '',
				password: ''
			};
			$scope.login = function (credentials) {
				AuthService.login(credentials).then(function (user) {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.setCurrentUser(user);
				}, function () {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
			};

		}]);
})();
