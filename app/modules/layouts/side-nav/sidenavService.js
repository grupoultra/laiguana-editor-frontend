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
						link: 'articles',
							name: 'Artículos'
					},

					{
						link: 'categories',
						name: 'Categorias'
					},
					{
						link: 'users',
							name: 'Usuarios'
					},

		  	];

			return {
				listMenu: function () {
					return menu;
				}
		  	}

		}

})();
