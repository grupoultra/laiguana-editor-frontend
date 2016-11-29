(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:modelsTest
	 * @description
	 * # modelsTest
	 * Test of the app
	 */

	describe('models test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('laiguana-editor');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('ModelsCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
