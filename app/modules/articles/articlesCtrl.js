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

		Articles.$inject = ['$scope', '$state', '$stateParams', '$mdDialog', '$mdToast', 'lodash', '$q', '$http', 'AuthService', 'ENV', 'Restangular'];

		function Articles($scope, $state, $stateParams, $mdDialog, $mdToast, _, q, $http, AuthService, ENV, Restangular) {
			/*jshint validthis: true */
			var vm = this;

			vm.readonly = false;

			$scope.Zones = [];
			$scope.Categories = [];

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
				return ($scope['selected' + list].length !== 0 &&
				$scope['selected' + list].length !== $scope[list].length);
			};

			$scope.isChecked = function(list) {
				return $scope['selected' + list].length === $scope[list].length;
			};

			$scope.toggleAll = function(list) {
				if ($scope['selected' + list].length === $scope[list].length) {
					$scope['selected' + list] = [];
				} else if ($scope['selected' + list].length === 0 || $scope['selected' + list].length > 0) {
					$scope['selected' + list] = $scope[list].slice(0);
				}
			};

			vm.loadCategorizations = function() {
				var categorizations = Restangular.all("categorizations");

				categorizations
					.customGET("categories")
					.then(function(data){
						$scope.Categories = data;
					});
				categorizations
					.customGET("zones")
					.then(function(data){
						$scope.Zones = data;
					});
			};
			vm.loadArticles = function() {
				var filterObject = {'filter[include]': 'editorUser'};

				if(!AuthService.isAdmin()){
					filterObject['filter[where][editorUserId]'] = AuthService.getUserId();
				}

				var baseArticles = Restangular.all('items');

				baseArticles.getList(filterObject)
					.then(function(articles){
						$scope.articles = articles;
					})
					.catch(function(err){
						console.log(err);
					});
			};

			vm.edit = false;

			$scope.newYoutubes = [];
			$scope.newTweets = [];

			$scope.deleteYoutubes = [];
			$scope.deleteTweets = [];
			$scope.deleteImages = [];

			if($state.current.name === 'home.articles'){
				vm.loadArticles();
			} else if($state.current.name === 'home.newarticle'){
				vm.article = {
					editorUserId: AuthService.getUserId(),
					title: "",
					alt_titles: [],
					tags: [],
					body: ""
				};

				vm.loadCategorizations();

				$scope.youtubes = [];
				$scope.tweets = [];
				//	TODO: Eliminar estos datos cableados
			} else if($state.current.name === 'home.editarticle'){
				vm.edit = true;

				var filterObject = {'filter[include]': ['images', 'tweet', 'youtube-video']};

				vm.loadCategorizations();

				Restangular
					.one('items', $stateParams.id)
					.get(filterObject)
					.then(function(article){
						vm.article = article;

						$scope.youtubes = article['youtube-video'];
						$scope.tweets = article.tweet;
					});
			}

			vm.deleteImage = function(deleteItem){
				_.remove(vm.article.images, function(item){
					return deleteItem.id === item.id;
				});
				$scope.deleteImages.push(deleteItem);
				console.log($scope.deleteImages);
			};

			vm.deleteMultimedia = function(video, type){
				_.remove($scope[type + 's'], function(item){
					return item[type + 'ID'] === video[type + 'ID'];
				});
				$scope['delete' + _.upperFirst(type) + 's'].push(video);
			};

			$scope.addNewMultimedia = function(type) {
				var key = type + 'ID';

				$scope['new' + _.upperFirst(type) + 's'].push({key: ''});
			};

			// TODO: refactorizar la lógica del procesado del formulario a otro controlador

			vm.ProcessForm = function(){
				var newArticleId ;

				var articleOperation = vm.edit ? vm.article.put() : Restangular.all("items").post(vm.article);

				articleOperation
					.then(function(article){
						console.log("Articulo creado", article);
						newArticleId = article.id;

						return q.all(_.map($scope.selectedCategories, function(selectedCategory){
							return Restangular
								.all("itemcategorizations")
								.post({ itemId: newArticleId, categorizationId: selectedCategory.id});
						}));
					})
					.then(function(response){
						console.log(response.length, "categories creadas para el articulo");

						return q.all(_.map($scope.selectedZones, function(selectedCategory){
							return Restangular
								.all("itemcategorizations")
								.post({ itemId: newArticleId, categorizationId: selectedCategory.id});
						}));
					})
					.then(function(response){
						console.log(response.length, "zonas creadas para el articulo");

						return _.map($scope.files, function(file){
							var formData = new FormData();

							formData.append('file', file.lfFile);

							console.log();
							return $http.post(ENV.API_URL + '/Items/'+ newArticleId +'/uploadImage', formData, {
								transformRequest: angular.identity,
								headers: {'Content-Type': undefined}
							});
						});
					})
					.then(function(response){
						console.log("imagenes cargadas para el artículo", response);
						return q.all(_.map($scope.deleteImages, function(image){
							return $http.delete(ENV.API_URL + '/Items/'+ newArticleId +'/deleteImage/' + image.id);
						}));
					})
					.then(function(response){
						console.log("imagenes eliminadas para el artículo", response);

						_.remove($scope.newYoutubes, function(video){
							return _.isEmpty(video.youtubeID);
						});

						if(_.isEmpty($scope.newYoutubes)){
							return [];
						} else	{
							return _.map($scope.newYoutubes, function (video) {
								return Restangular
									.one("items", newArticleId)
									.customPOST(video, "youtube-video", {}, {});
							});
						}
					})
					.then(function(response){
						console.log("videos creados para el artículo", response);

						_.remove($scope.newTweets, function(tweet){
							return _.isEmpty(tweet.tweetID);
						});

						if(_.isEmpty($scope.newTweets)){
							return [];
						} else	{
							return _.map($scope.newTweets, function(tweet){
								return Restangular
									.one("items", newArticleId)
									.customPOST(tweet, "tweet", {}, {});
							});
						}
					})
					.then(function(response){
						console.log("tweets creados para el artículo", response);

						if(_.isEmpty($scope.deleteYoutubes)){
							return [];
						} else {
							return _.map($scope.deleteYoutubes, function(youtube){
								return Restangular.one("items", newArticleId).one("youtube-video", youtube.id).remove();
							});
						}
					})
					.then(function(response){
						console.log("videos eliminados para el artículo", response);

						if(_.isEmpty($scope.deleteTweets)){
							return [];
						} else {
							return _.map($scope.deleteTweets, function(tweet){
								return Restangular.one("items", newArticleId).one("tweet", tweet.id).remove();
							});
						}
					})
					.then(function(response){
						console.log("tweets eliminados para el artículo", response);

						$state.go("home.articles");

						var action = vm.edit ? "editado" : "creado";

						console.log("Artículo " + action);
						vm.showSimpleToast("Artículo " + action);
					})
					.catch(function(err){
						console.log(err);
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

					Restangular
						.one("items", article.id)
						.remove()
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
