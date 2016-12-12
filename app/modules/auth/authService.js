(function() {
	'use strict';

	angular
		.module('auth')
		.factory('AuthService', function ($http, $window, $state) {
			var authService = {};
			var tokenName = 'laiguana-token';
			var tokenFullName = 'laiguana-fullname';
			var tokenRole = 'laiguana-role';

			var getToken = function() {
				return $window.localStorage[tokenName];
			};
			var getRole = function() {
				return $window.localStorage[tokenRole];
			};

			var setSession = function(token, fullname, role) {
				$window.localStorage[tokenName] = token;
				$window.localStorage[tokenFullName] = fullname;
				$window.localStorage[tokenRole] = role;
			};
			var resetToken = function() {
				$window.localStorage[tokenName] = '';
				$window.localStorage[tokenFullName] = '';
				$window.localStorage[tokenRole] = '';
			};

			var destroy = function () {
				this.id = null;
				this.userId = null;
			};

			authService.logout = function () {
				return resetToken();
			};

			authService.login = function (credentials) {
				return $http
					.post('http://localhost:3000/api/EditorUsers/login', credentials)
					.then(function (res) {
						setSession(res.data.id, res.data.fullname, res.data.role );

						return res.data;
					})
					.catch(function(err){
						console.log(err);
					});
			};
			authService.isAuthenticated = function () {
				return !!getToken();
			};
			authService.isAdmin = function () {
				return getRole() === "Admin";
			};

			authService.isAuthorized = function (authorizedRoles) {
				if (!angular.isArray(authorizedRoles)) {
					authorizedRoles = [authorizedRoles];
				}
				return (authService.isAuthenticated() &&
				authorizedRoles.indexOf(Session.userRole) !== -1);
			};

			return authService;
		});
})();
