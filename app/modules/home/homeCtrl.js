(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('laiguana-editor')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService', 'AuthService'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService, AuthService) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "Hedwig: editor de contenidos para <a href=\"http://laiguana.tv\">LaIguana.tv</a>";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

		vm.user = {
			fullname: AuthService.getFullName()
		};
	}

})();
