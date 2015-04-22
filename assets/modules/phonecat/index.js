require("angular");
require('angular-ui-router');

var phoneListTemplate = require("./templates/phone-list.jade");
var phoneDetailTemplate = require("./templates/phone-detail.jade");

/* App Module */
var phoneModule = angular.module('phoneModule', ['ui.router']);

phoneModule.run(["$templateCache", function($templateCache) {
  $templateCache.put('phoneListTemplate.html', phoneListTemplate());
  $templateCache.put('phone.detail.html', phoneDetailTemplate());
}]);

phoneModule.config(["$stateProvider", "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('phones', {
      url: "/phones",
      templateProvider: function($templateCache){
        return $templateCache.get('phoneListTemplate.html');
      },
      controller: function($scope) {
      }
    })
    .state('phonesDetails', {
      url: "/phones/:phoneId",
      templateProvider: function($templateCache){
        return $templateCache.get('phone.detail.html');
      },
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    });
}]);

module.exports = phoneModule;