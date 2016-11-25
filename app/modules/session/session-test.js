(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:sessionTest
	 * @description
	 * # sessionTest
	 * Test of the app
	 */

	describe('session test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('laiguana-editor');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('SessionCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
