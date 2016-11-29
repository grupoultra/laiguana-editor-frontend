(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:articleCtrl
	* @description
	* # articleCtrl
	* Controller of the app
	*/

  	angular
		.module('article')
		.controller('ArticleCtrl', Article);

		Article.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Article() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
