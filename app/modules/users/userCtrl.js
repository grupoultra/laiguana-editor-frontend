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

    Users.$inject = ['$stateParams', '$scope', 'EditorUsersModel', 'Restangular'];

    function Users($stateParams, $scope, Restangular) {
        /*jshint validthis: true */
        var vm = this;

		Restangular
			.one("editorusers", $stateParams.id)
			.get()
            .then(function(user){
                $scope.user = user;
            });
    }

})();
