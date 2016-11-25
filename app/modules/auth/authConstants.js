(function() {
	'use strict';

	angular
		.module('app.auth')
		.constant('authEvents', {
			LOGIN_SUCCESS: 'auth_login_success',
			LOGIN_FAILED: 'auth_login_failed',
			LOGOUT_SUCCESS: 'auth_logout_success',
			LOGOUT_FAILED: 'auth_logout_failed',
			SESSION_TIMEOUT: 'auth_session_timeout',
			NOT_AUTHENTICATED: 'auth_not_authenticated',
			NOT_AUTHORIZED: 'auth_not_authorized'
		})
		.constant('USER_ROLES', {
			all: '*',
			admin: 'admin',
			editor: 'editor',
			guest: 'guest'
		});
})();
