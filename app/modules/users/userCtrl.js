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
		.controller('UserCtrl', Users);

	Users.$inject = ['$stateParams', '$scope', 'EditorUsersModel', 'CategoriesModel'];

	function Users($stateParams, $scope, EditorUsersModel, CategoriesModel) {
		/*jshint validthis: true */
		var vm = this;

		EditorUsersModel.get($stateParams, {}).$promise
			.then(function(user){
				console.log(user);
				$scope.user = user;
			})
	}

})();
