'use strict';

describe('Controller: WorkshopCtrl', function () {

  // load the controller's module
  beforeEach(module('portfolioApp'));

  var WorkshopCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkshopCtrl = $controller('WorkshopCtrl', {
      $scope: scope
    });
  }));

  it('should attach my name to the scope', function () {
    expect(scope.myName).toBe('Marc Njoku');
  });
});
