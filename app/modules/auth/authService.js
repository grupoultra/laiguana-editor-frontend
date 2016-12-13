(function() {
	'use strict';

	angular
		.module('auth')
		.factory('AuthService', function ($http, $window, $state) {
			var authService = {};
			var tokenName = 'laiguana-token';
			var tokenFullName = 'laiguana-fullname';
			var tokenRole = 'laiguana-role';
			var tokenUserId = 'laiguana-userId';

			var getToken = function() {
				return $window.localStorage[tokenName];
			};
			var getRole = function() {
				return $window.localStorage[tokenRole];
			};
			var getFullName = function() {
				return $window.localStorage[tokenFullName];
			};
			var getUserId = function() {
				return $window.localStorage[tokenUserId];
			};

			var setSession = function(token, fullname, role, userId) {
				$window.localStorage[tokenUserId] = userId;
				$window.localStorage[tokenName] = token;
				$window.localStorage[tokenFullName] = fullname;
				$window.localStorage[tokenRole] = role;
			};
			var resetToken = function() {
				$window.localStorage[tokenUserId] = '';
				$window.localStorage[tokenName] = '';
				$window.localStorage[tokenFullName] = '';
				$window.localStorage[tokenRole] = '';
			};

			authService.logout = function () {
				return resetToken();
			};
			authService.getFullName = function () {
				return getFullName();
			};
			authService.getUserId = function () {
				return getUserId();
			};

			authService.login = function (credentials) {
				return $http
					.post('http://localhost:3000/api/EditorUsers/login', credentials)
					.then(function (res) {
						setSession(res.data.id, res.data.fullname, res.data.role, res.data.userId );

						return res.data;
					})
					.catch(function(err){
						console.log(err);
						throw(err);
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
