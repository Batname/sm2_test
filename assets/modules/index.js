require("angular");
require('angular-ui-router');
require("./phonecat")
// var jQuery = require('jquery');
// jQuery('body').html(template);

require("./style.scss");

var homeTemplate = require("./home.jade");

/* App Module */
var phonecatApp = angular.module('phonecatApp', ['ui.router', 'phoneModule']);

phonecatApp.run(["$templateCache", function($templateCache) {
  $templateCache.put('homeTemplate.html', homeTemplate());
}]);

phonecatApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('home', {
      url: "/",
      templateProvider: function($templateCache){
        return $templateCache.get('homeTemplate.html');
      },
      controller: function($scope) {
      }
    });
}]);

