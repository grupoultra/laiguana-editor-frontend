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

		Categories.$inject = ['$scope', 'CategoriesModel', '$state', '$mdDialog', '$mdToast'];

		function Categories($scope, CategoriesModel, $state, $mdDialog, $mdToast) {
			/*jshint validthis: true */
			var vm = this;

			vm.category = {
				body: "",
				type: ""
			};
			vm.types = [
				{ value: "zone", tag:"Zona"},
				{ value: "category", tag:"Categoria"}
			];


			vm.loadCategorizations = function(){
				CategoriesModel.categories(function(data){
						$scope.categories = data;
					});

				CategoriesModel.zones(function(data){
						$scope.zones = data;
					});
			};

			vm.loadCategorizations();

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
			vm.ProcessForm = function(){
				CategoriesModel.save(vm.category).$promise
					.then(function(category){
						console.log("Categorizacion creada", category);
						$state.go("home.categories");
						vm.showSimpleToast("Categorizacion creada");

						//	TODO: mostrar toaster
					})
					.catch(function(err){
						console.log(err);
					});
			};
			vm.showConfirm = function(category) {
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
					CategoriesModel.delete(category).$promise
						.then(function(category){
							console.log("Categorizacion eliminada", category);
							vm.loadCategorizations();
							vm.showSimpleToast("Categorizacion eliminada");

							//	TODO: mostrar toaster
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
