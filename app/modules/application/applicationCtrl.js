(function() {
    'use strict';

    /**
    * @ngdoc function
    * @name app.controller:applicationCtrl
    * @description
    * # applicationCtrl
    * Controller of the app
    */

    angular
        .module('application')
        .controller('ApplicationCtrl', ['$scope', function($scope){
            var vm = this;

            $scope.setCurrentUser = function (user) {
                $scope.currentUser = user;
            };
        }]);
})();
