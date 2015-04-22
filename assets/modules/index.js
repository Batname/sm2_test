require("angular");
require('angular-ui-router');
// var jQuery = require('jquery');

require("./style.scss");

var template = require("./file.jade");
var newsTemplate = require("./news.jade");
// jQuery('body').html(template);

/* App Module */

var phonecatApp = angular.module('phonecatApp', ['ui.router']);

phonecatApp.run(function($templateCache) {
  $templateCache.put('templateId.html', template());
  $templateCache.put('newsId.html', newsTemplate());
});

phonecatApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/",
      templateProvider: function($templateCache){
        return $templateCache.get('templateId.html');
      },
      controller: function($scope) {
      }
    })
    .state('news', {
      url: "/news",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      },
      templateProvider: function($templateCache){
        return $templateCache.get('newsId.html');
      },
    });
}]);

