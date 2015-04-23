"use strict";

import "angular";
import "angular-ui-router";
import "oclazyload";
import "babel/register";

import indexStyle from "!raw!sass!./styles/index.scss";
import homeTemplate from "./templates/index.jade";

let homeModule = angular.module('homeModule', ['ui.router', 'oc.lazyLoad']);

homeModule.run(["$templateCache", function($templateCache) {
  $templateCache.put('homeTemplate.html', `<style>${indexStyle}</style>homeTemplate()`);
}]);

homeModule.config(["$stateProvider",
  function($stateProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateProvider: ['$templateCache', function($templateCache){
        return $templateCache.get('homeTemplate.html');
      }],
      controller: ['$scope', '$ocLazyLoad', function($scope, $ocLazyLoad) {
        $ocLazyLoad.load();
      }]
    });
}]);

export default homeModule;
