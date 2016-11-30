(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:articlesCtrl
	* @description
	* # articlesCtrl
	* Controller of the app
	*/

  	angular
		.module('articles')
		.controller('ArticlesCtrl', Articles);

		Articles.$inject = ['$scope', 'ArticlesModel', 'CategoriesModel'];

		function Articles($scope, ArticlesModel, CategoriesModel) {
			/*jshint validthis: true */
			var vm = this;

			vm.tags = [];
			vm.readonly = false;

			vm.article = {
				editorUserId: 1,
				title: "Titulo",
				alt_titles: ['alt1', 'alt2'],
				tags: ['tag1', 'tag2'],
				body: "Body"
			};

			$scope.Categories = [1,2,3,4,5];
			$scope.Zones = [1,2,3,4,5];

			CategoriesModel.categories(function(data){
				$scope.Categories = data;
			});

			CategoriesModel.zones(function(data){
				$scope.Zones = data;
			});


			$scope.selectedCategories = [];
			$scope.selectedZones = [];
			$scope.toggle = function (item, list) {
				var idx = list.indexOf(item);
				if (idx > -1) {
					list.splice(idx, 1);
				}
				else {
					list.push(item);
				}
			};

			$scope.exists = function (item, list) {
				return list.indexOf(item) > -1;
			};

			$scope.isIndeterminate = function(list) {
				return ($scope['selected' + list]['length'] !== 0 &&
				$scope['selected' + list]['length'] !== $scope[list]['length']);
			};

			$scope.isChecked = function(list) {
				return $scope['selected' + list]['length'] === $scope[list]['length'];
			};

			$scope.toggleAll = function(list) {
				if ($scope['selected' + list]['length'] === $scope[list]['length']) {
					$scope['selected' + list] = [];
				} else if ($scope['selected' + list]['length'] === 0 || $scope['selected' + list]['length'] > 0) {
					$scope['selected' + list] = $scope[list].slice(0);
				}
			};

			ArticlesModel.query({filter: {"include":"editorUser"}}).$promise
				.then(function(data){
					$scope.articles = data;
				});

			vm.ProcessForm = function(){
				ArticlesModel.save(vm.article).$promise
					.then(function(article){
						console.log("Articulo creado", article.id);
						console.log($scope.selectedCategories[0]);
						return ArticlesModel.createCategory({id: article.id}, $scope.selectedCategories[0])
					})
					.then(function(response){
						// console.log(response);
					});
			}
		}

})();
