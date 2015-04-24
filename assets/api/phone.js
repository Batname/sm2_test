'use strict';

import "angular";
import 'angular-resource';

let phonecatApi = angular.module('phonecatApi', ['ngResource']);

phonecatApi.factory('Phone', ['$resource',
  function($resource){
    return $resource('api/phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

export default phonecatApi;