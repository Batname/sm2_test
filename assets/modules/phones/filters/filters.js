'use strict';

import "angular";

let phonecatFilters = angular.module('phonecatFilters', []);

phonecatFilters.filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

export default phonecatFilters;