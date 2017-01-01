'use strict';

angular.module('myApp.view1', ['ngRoute', 'myApp.messages'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1/:id', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$rootScope','$scope','$routeParams','$http', 'messages',function($rootScope,$scope,$routeParams, $http, messages) {
    var token = $rootScope.token;
    messages.message($routeParams.id,token,function (res) {
        $scope.message = res.data;
    });
    $scope.back = function () {
        window.history.back();
    }

}]);