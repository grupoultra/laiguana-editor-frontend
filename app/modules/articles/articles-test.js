(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:articlesTest
	 * @description
	 * # articlesTest
	 * Test of the app
	 */

	describe('articles test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('laiguana-editor');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('ArticlesCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
