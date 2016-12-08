(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:usersCtrl
	* @description
	* # usersCtrl
	* Controller of the app
	*/

  	angular
		.module('users')
		.controller('UsersCtrl', Users);

		Users.$inject = ['UsersModel'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Users(UsersModel) {
			/*jshint validthis: true */
			var vm = this;

			UsersModel.get().$promise
				.then(function(users){
					$scope.users = user;
				});

		}

})();
