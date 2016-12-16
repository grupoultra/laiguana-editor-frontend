(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:categoriesCtrl
	* @description
	* # categoriesCtrl
	* Controller of the app
	*/

	angular
		.module('categories')
		.controller('CategoriesCtrl', Categories);

		Categories.$inject = ['$stateParams', '$scope', '$state', '$mdDialog', '$mdToast', 'Restangular'];

		function Categories($stateParams, $scope, $state, $mdDialog, $mdToast, Restangular) {
			/*jshint validthis: true */
			var vm = this;
			vm.edit = false;

			vm.loadCategorizations = function(){
				var categorizations = Restangular.all("categorizations");

				categorizations
					.customGET("categories")
					.then(function(data){
						$scope.categories = data;
					});
				categorizations
					.customGET("zones")
					.then(function(data){
						$scope.zones = data;
					});
			};

			if($state.current.name === 'home.categories'){
				vm.loadCategorizations();
			} else if($state.current.name === 'home.newcategory'){
				vm.category = {
					body: "",
					type: ""
				};
			} else if($state.current.name === 'home.editcategory'){
				vm.edit = true;

				Restangular
					.one('categorizations', $stateParams.id)
					.get()
					.then(function(category){
						vm.category = category
					});
			}

			vm.types = [
				{ value: "zone", tag:"Zona"},
				{ value: "category", tag:"Categoria"}
			];

			vm.ProcessForm = function(){
				var categorizations = Restangular.all("categorizations");
				if (vm.edit){
					console.log("Editando");

					vm.category.put()
						.then(function (category) {
							console.log("Categorizacion editada", category);
							$state.go("home.categories");
							vm.showSimpleToast("Categorizacion editada");
						})
						.catch(function (err) {
							console.log(err);
						});
				} else {
					console.log("Creando");
					Restangular
						.all("categorizations")
						.post(vm.category)
						.then(function (category) {
							console.log("Categorizacion creada", category);
							$state.go("home.categories");
							vm.showSimpleToast("Categorizacion creada");
						})
						.catch(function (err) {
							console.log(err);
						});
				}
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

			vm.deleteConfirm = function(category) {
				console.log(category);

				// Appending dialog to document.body to cover sidenav in docs app
				var confirm = $mdDialog.confirm()
					.title('¿Quiere eliminar la categoria \'' +category.body +'\'?')
					.textContent('Esta acción es irreversible')
					.ariaLabel('Lucky day')
					.ok('Si, eliminala')
					.cancel('No, cancela');

				$mdDialog.show(confirm).then(function() {
					$scope.status = 'You decided to get rid of your debt.';

					Restangular
						.one("categorizations", category.id)
						.remove()
						.then(function(category){
							console.log("Categorizacion eliminada", category);
							vm.loadCategorizations();
							vm.showSimpleToast("Categorizacion eliminada");
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
