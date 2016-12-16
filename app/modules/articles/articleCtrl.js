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
		.controller('ArticleCtrl', Articles);

		Articles.$inject = ['$stateParams', '$scope', 'Restangular'];

		function Articles($stateParams, $scope, Restangular) {
			/*jshint validthis: true */
			var vm = this;
			var filterObject = {'filter[include]': ['images', 'tweet', 'youtube-video', 'categorization']};

			Restangular
				.one('items', $stateParams.id)
				.get(filterObject)
				.then(function(article){
					console.log(article);
					$scope.article = article;
				});
		}

})();
