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
        .directive('pwCheck', Directive);

    Directive.$inject = [];

    function Directive() {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val()===$(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        };
    }

})();

