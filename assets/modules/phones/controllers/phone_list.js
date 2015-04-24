"use strict";

import "angular";
import "./../../../api/phone";

let phonecatController = angular.module('phonecatControllers', ['phonecatApi']);

phonecatController.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatController.controller('PhoneDetailCtrl', ['$scope', '$stateParams', 'Phone',
  function($scope, $stateParams, Phone) {
    $scope.phone = Phone.get({phoneId: $stateParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };

  }]);

export default phonecatController;