(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

  	angular
		.module('laiguana-editor')
		.factory('MenuService', Menu);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Menu.$inject = ['$http'];

		function Menu ($http) {

			var menu = [
				
					{
						link: 'session',
							name: 'Session'
					},
			    
					{
						link: 'application',
							name: 'Application'
					},
			    
					{
						link: 'categories',
							name: 'Categories'
					},
			    
					{
						link: 'models',
							name: 'Models'
					},
			    
					{
						link: 'article',
							name: 'Article'
					},
			    
					{
						link: 'users',
							name: 'Users'
					},
			    
		  	];

			return {
				listMenu: function () {
					return menu;
				}
		  	}

		}

})();
