(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.service:articleService
     * @description
     * # articleService
     * Service of the app
     */

    angular
        .module('articles')
        .factory('ArticlesService', Articles);
        // Inject your dependencies as .$inject = ['$http', 'someSevide'];
        // function Name ($http, someSevide) {...}

        Articles.$inject = ['$http'];

        function Articles ($http) {

        }

})();
