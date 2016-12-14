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
		.controller('SessionCtrl', Session);

		Session.$inject = ['$scope', '$state', '$rootScope', 'authEvents', 'AuthService', '$mdToast'];

		function Session ($scope, $state,$rootScope, AUTH_EVENTS, AuthService, $mdToast){
			/*jshint validthis: true */
			var vm = this;

			$scope.credentials = {
				username: 'alexis',
				password: 'ale-ale'
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

				if ( current.bottom && last.top ) {
					current.top = false;
				}
				if ( current.top && last.bottom ) {
					current.bottom = false;
				}
				if ( current.right && last.left ) {
					current.left = false;
				}
				if ( current.left && last.right ) {
					current.right = false;
				}

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
						$rootScope.$broadcast(AUTH_EVENTS.LOGIN_SUCCESS);
						$scope.setCurrentUser(user);
						$state.go('home.articles', {}, {reload: true});
						vm.showSimpleToast(AUTH_EVENTS.LOGIN_SUCCESS);
					})
					.catch(function () {
						vm.showSimpleToast(AUTH_EVENTS.LOGIN_FAILED);
						$rootScope.$broadcast(AUTH_EVENTS.LOGOUT_FAILED);
					});
			};
		}
})();
