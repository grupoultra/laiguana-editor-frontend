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

		Categories.$inject = ['$scope', 'CategoriesModel'];

		function Categories($scope, CategoriesModel) {
			/*jshint validthis: true */
			var vm = this;

			CategoriesModel.categories(function(data){
					$scope.categories = data;
				});

			CategoriesModel.zones(function(data){
					$scope.zones = data;
				});
		}

})();
