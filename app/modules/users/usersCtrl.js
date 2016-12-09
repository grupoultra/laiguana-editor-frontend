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

		Users.$inject = ['EditorUsersModel', '$scope'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Users(EditorUsersModel, $scope) {
			/*jshint validthis: true */
			var vm = this;

			EditorUsersModel.query().$promise
				.then(function(users){
					$scope.users = users;
				});

		}

})();
