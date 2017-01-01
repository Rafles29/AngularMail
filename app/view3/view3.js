'use strict';

angular.module('myApp.view3', ['ngRoute','myApp.messages'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope', 'messages',function($scope, messages) {



}]);