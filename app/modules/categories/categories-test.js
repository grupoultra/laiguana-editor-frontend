(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:categoriesTest
	 * @description
	 * # categoriesTest
	 * Test of the app
	 */

	describe('categories test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('laiguana-editor');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('CategoriesCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
