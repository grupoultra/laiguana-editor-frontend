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

		Articles.$inject = ['$scope', 'ArticlesModel', 'CategoriesModel', 'ArticleCategoryModel', '$mdDialog', '$mdToast', 'lodash', '$q', '$http'];

		function Articles($scope, ArticlesModel, CategoriesModel, ArticleCategoryModel, $mdDialog, $mdToast, _, q, $http) {
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

			vm.loadArticles = function(){
				ArticlesModel.query({filter: {"include":"editorUser"}}).$promise
					.then(function(data){
						$scope.articles = data;
					});
			};

			vm.loadArticles();

			var newArticleId ;

			vm.ProcessForm = function(){
				ArticlesModel.save(vm.article).$promise
					.then(function(article){
						console.log("Articulo creado", article);
						newArticleId = article.id;

						return q.all(_.map($scope.selectedCategories, function(selectedCategory){
							return ArticleCategoryModel.save({ itemId: article.id, categorizationId: selectedCategory.id});
						}));
					})
					.then(function(response){
						console.log(response.length, "categories creadas para el articulo");

						return q.all(_.map($scope.selectedZones, function(selectedCategory){
							return ArticleCategoryModel.save({ itemId: newArticleId, categorizationId: selectedCategory.id});
						}));
					})
					.then(function(response){
						console.log(response.length, "zonas creadas para el articulo");

						var formData = new FormData();
						angular.forEach($scope.files,function(obj){
							formData.append('file', obj.lfFile);
						});
						return $http.post('http://localhost:3000/api/Items/'+ newArticleId +'/uploadImage', formData, {
							transformRequest: angular.identity,
							headers: {'Content-Type': undefined}
						});
					})
					.then(function(response){
						console.log("imagenes cargadas para el artículo", response);
					})
					.catch(function(err){
						console.log(err);
					});
			};

			$scope.$watch('files.length',function(newVal,oldVal){
				console.log($scope.files);
			});

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

			vm.deleteConfirm = function(article) {
				// Appending dialog to document.body to cover sidenav in docs app
				var confirm = $mdDialog.confirm()
					.title('¿Quiere eliminar el articulo \'' +article.title +'\'?')
					.textContent('Esta acción es irreversible')
					.ariaLabel('Lucky day')
					.ok('Si, eliminalo')
					.cancel('No, cancela');

				$mdDialog.show(confirm).then(function() {
					$scope.status = 'You decided to get rid of your debt.';
					ArticlesModel.delete(article).$promise
						.then(function(article){
							console.log("Articulo eliminado", article);
							vm.loadArticles();
							vm.showSimpleToast("Articulo eliminado");
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
