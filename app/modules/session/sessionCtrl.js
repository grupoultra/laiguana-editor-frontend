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
		.controller('SessionCtrl', ['$scope', '$state', '$rootScope', 'authEvents', 'AuthService', '$mdDialog', '$mdToast', function($scope, $state,$rootScope, AUTH_EVENTS, AuthService, $mdDialog, $mdToast){
			/*jshint validthis: true */
			var vm = this;

			$scope.credentials = {
				username: '',
				password: ''
			};

			// Manejo de Toast
			var last = {
				bottom: false,
				top: true,
				left: false,
				right: true
			};
			vm.toastPosition = angular.extend({},last);

			vm.getToastPosition = function() {
				sanitizePosition();

				return Object.keys(vm.toastPosition)
					.filter(function(pos) { return vm.toastPosition[pos]; })
					.join(' ');
			};

			function sanitizePosition() {
				var current = vm.toastPosition;

				if ( current.bottom && last.top ) current.top = false;
				if ( current.top && last.bottom ) current.bottom = false;
				if ( current.right && last.left ) current.left = false;
				if ( current.left && last.right ) current.right = false;

				last = angular.extend({},current);
			}

			vm.showSimpleToast = function(message) {
				var pinTo = vm.getToastPosition();

				$mdToast.show(
					$mdToast.simple()
						.textContent(message)
						.position(pinTo )
						.hideDelay(3000)
				);
			};
			// Fin manejo de Toast

			$scope.login = function (credentials) {
				AuthService.login(credentials)
					.then(function (user) {
						$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
						$scope.setCurrentUser(user);
						$state.go("home.articles");
						vm.showSimpleToast(AUTH_EVENTS.LOGIN_SUCCESS);
					})
					.catch(function (err) {
						$rootScope.$broadcast(AUTH_EVENTS.LOGOUT_FAILED);
					});
			};




		}]);
})();
