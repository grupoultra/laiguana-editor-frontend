(function() {
	'use strict';

	angular
		.module('auth')
		.constant('authEvents', {
			LOGIN_SUCCESS: 'Inicio de sesión exitoso',
			LOGIN_FAILED: 'Inicio de sesión fallido',
			LOGOUT_SUCCESS: 'auth_logout_success',
			LOGOUT_FAILED: 'auth_logout_failed',
			SESSION_TIMEOUT: 'auth_session_timeout',
			NOT_AUTHENTICATED: 'auth_not_authenticated',
			NOT_AUTHORIZED: 'No está autorizado para acceder a esta información'
		})
		.constant('USER_ROLES', {
			all: '*',
			admin: 'admin',
			editor: 'editor',
			guest: 'guest'
		});
})();
