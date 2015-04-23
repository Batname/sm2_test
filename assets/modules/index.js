import "angular";
import 'angular-ui-router';
import "./../styles/index.scss";
import "babel!./home";
import "./phones";
// var jQuery = require('jquery');
// jQuery('body').html(template);
let phonecatApp = angular.module('phonecatApp', ['ui.router', 'phoneModule', 'homeModule']);

phonecatApp.config(["$urlRouterProvider", "$locationProvider",
  function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
}]);

