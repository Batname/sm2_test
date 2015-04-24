'use strict';

require("angular");

/* jasmine specs for controllers go here */
describe('PhoneCat controllers', function() {
  var $scope;
  var controller;

  beforeEach(angular.mock.module(require('./../index.js').name));

  beforeEach(angular.mock.inject(function ($injector) {
    $scope = $injector.get('$rootScope').$new(true);
    controller = $injector.get('$controller')('PhoneListCtrl');

  }));

  it('should have `test` property', function () {
    console.log("bay");
  });


});