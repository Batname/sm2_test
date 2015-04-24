"use strict";

import "angular";
import 'angular-ui-router';
import 'oclazyload';

import "./controllers/phone_list";
import "./filters/filters";
import "./animations/animations";

import indexStyle from "!raw!sass!./styles/index.scss";
import phoneListTemplate from "./templates/phone-list.jade";
import phoneDetailTemplate from "./templates/phone-detail.jade";


let phoneModule = angular.module('phoneModule',
  [
    'ui.router',
    'oc.lazyLoad',
    'phonecatControllers',
    'phonecatAnimations',
    'phonecatFilters'
  ]);

phoneModule.run(["$templateCache", function($templateCache) {
  $templateCache.put('phoneListTemplate.html', `<style>${indexStyle}</style>${phoneListTemplate()}`);
  $templateCache.put('phoneDetailTemplate.html', `<style>${indexStyle}</style>${phoneDetailTemplate()}`);
}]);

phoneModule.config(["$stateProvider", "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('phones', {
      url: "/phones",
      templateProvider: ['$templateCache', function($templateCache){
        return $templateCache.get('phoneListTemplate.html');
      }],
      controller: "PhoneListCtrl"
    })
    .state('phonesDetails', {
      url: "/phones/:phoneId",
      templateProvider: ['$templateCache', function($templateCache){
        return $templateCache.get('phoneDetailTemplate.html');
      }],
      controller: "PhoneDetailCtrl"
    });
}]);

export default phoneModule;