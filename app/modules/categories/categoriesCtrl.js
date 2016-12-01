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

		Categories.$inject = ['$scope', 'CategoriesModel', '$state'];

		function Categories($scope, CategoriesModel, $state) {
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
			CategoriesModel.categories(function(data){
					$scope.categories = data;
				});

			CategoriesModel.zones(function(data){
					$scope.zones = data;
				});

			vm.ProcessForm = function(){
				CategoriesModel.save(vm.category).$promise
					.then(function(category){
						console.log("Categorizacion creada", category);
						$state.go("home.categories");
					//	TODO: mostrar toaster
					})
					.catch(function(err){
						console.log(err);
						cb(err);
					});
			}
		}

})();
