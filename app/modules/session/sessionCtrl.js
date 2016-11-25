(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:sessionCtrl
	* @description
	* # sessionCtrl
	* Controller of the app
	*/

  	angular
		.module('session')
		.controller('SessionCtrl', Session);

		Session.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Session() {
			/*jshint validthis: true */
			var vm = this;

		}

})();
