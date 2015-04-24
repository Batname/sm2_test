import "angular";
import 'angular-ui-router';
import "./../styles/index.scss";
import "./home";
import "./phones";
// import jQuery from 'jquery';
// jQuery('body').html("<hr />");


let phonecatApp = angular.module('phonecatApp', ['ui.router', 'phoneModule', 'homeModule']);

phonecatApp.config(["$urlRouterProvider", "$locationProvider",
  function($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
}]);

