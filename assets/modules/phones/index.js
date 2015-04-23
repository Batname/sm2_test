import "angular";
import 'angular-ui-router';
import 'oclazyload';

import indexStyle from "!raw!sass!./styles/index.scss";
import phoneListTemplate from "./templates/phone-list.jade";
import phoneDetailTemplate from "./templates/phone-detail.jade";


let phoneModule = angular.module('phoneModule', ['ui.router', 'oc.lazyLoad']);

phoneModule.run(["$templateCache", function($templateCache) {
  $templateCache.put('phoneListTemplate.html', `<style>${indexStyle}</style>phoneListTemplate()`);
  $templateCache.put('phoneDetailTemplate.html', phoneDetailTemplate());
}]);

phoneModule.config(["$stateProvider", "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('phones', {
      url: "/phones",
      templateProvider: ['$templateCache', function($templateCache){
        return $templateCache.get('phoneListTemplate.html');
      }],
      controller: ['$scope', function($scope) {
      }]
    })
    .state('phonesDetails', {
      url: "/phones/:phoneId",
      templateProvider: ['$templateCache', function($templateCache){
        return $templateCache.get('phoneDetailTemplate.html');
      }],
      controller: ['$scope', '$ocLazyLoad', function($scope, $ocLazyLoad) {
        $ocLazyLoad.load();
      }]
    });
}]);

export default phoneModule;