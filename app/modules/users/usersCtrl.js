(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:usersCtrl
	* @description
	* # usersCtrl
	* Controller of the app
	*/

	angular
		.module('users')
		.controller('UsersCtrl', Users);

		Users.$inject = ['$scope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'Restangular', 'lodash', '$q', '$http'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Users($scope, $state, $stateParams, $mdDialog, $mdToast, Restangular, _, q, $http) {
			/*jshint validthis: true */
			var vm = this;

			vm.loadUsers = function(){

				Restangular
					.all("editorusers")
					.getList()
					.then(function(users){
						$scope.users = users;
					});
			};

			$scope.edit = false;

			if($state.current.name === 'home.users'){
				vm.loadUsers();
			} else if($state.current.name === 'home.newuser'){
				vm.user = {};
			} else if($state.current.name === 'home.edituser'){
				$scope.edit = true;

				Restangular
					.one("editorusers", $stateParams.id)
					.get()
					.then(function(user){
						vm.user = user;
					});
			}

			vm.ProcessForm = function(){
				var userOperation = $scope.edit ? vm.user.put() : Restangular.all("editorusers").post(vm.user);

				userOperation
					.then(function(response){
						console.log("response", response);

						$state.go("home.users");

						var action = $scope.edit ? "editado" : "creado";

						console.log("Usuario " + action);
						vm.showSimpleToast("Usuario " + action);
					});
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

			vm.deleteConfirm = function(user) {
				// Appending dialog to document.body to cover sidenav in docs app
				var confirm = $mdDialog.confirm()
					.title('¿Quiere eliminar el usuario \'' +user.fullname +'\'?')
					.textContent('Esta acción es irreversible')
					.ariaLabel('Lucky day')
					.ok('Si, eliminalo')
					.cancel('No, cancela');

				$mdDialog.show(confirm).then(function() {
					$scope.status = 'You decided to get rid of your debt.';

					Restangular
						.one("editorusers", user.id)
						.remove()
						.then(function(user){
							console.log("Usuario eliminado", user);
							vm.loadUsers();
							vm.showSimpleToast("Usuario eliminado");
						})
						.catch(function(err){
							console.log(err);
						});

				}, function() {
					$scope.status = 'You decided to keep your debt.';
				});
			};
		}

})();
