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

			console.log(Object.keys(CategoriesModel));
			CategoriesModel.query(function(data){
				$scope.categories = data;
			});
		}

})();
