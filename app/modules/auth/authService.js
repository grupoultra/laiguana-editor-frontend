(function() {
	'use strict';

	angular
		.module('auth')
		.factory('AuthService', function ($http, Session) {
			var authService = {};

			authService.login = function (credentials) {
				return $http
					.post('http://localhost:3000/api/EditorUsers/login', credentials)
					.then(function (res) {
						Session.create(res.data.id, res.data.userId);

						console.log(Session.userId);
						return res.data;
					})
					.catch(function(err){
						console.log(err);
					});
			};

			authService.isAuthenticated = function () {
				console.log(Session.userId);
				return !!Session.userId;
			};

			authService.isAuthorized = function (authorizedRoles) {
				if (!angular.isArray(authorizedRoles)) {
					authorizedRoles = [authorizedRoles];
				}
				return (authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.userRole) !== -1);
			};

			return authService;
		})
		.service('Session', function () {
			this.create = function (sessionId, userId) {
				this.id = sessionId;
				this.userId = userId;
			};
			this.destroy = function () {
				this.id = null;
				this.userId = null;
			};
		})
})();
