'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.login', 'myApp.messages'])

.config(['$routeProvider' , function($routeProvider) {
  $routeProvider.when('/view2/:box', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$rootScope','$scope','$http', '$routeParams', 'messages', function($rootScope,$scope, $http, $routeParams, messages) {

    console.log($rootScope.logged);
    if($rootScope.logged) {
        var token = $rootScope.token;
        messages.messages(token,function (res) {
            $scope.inbox = res.data;
        });
        $scope.del = function (index) {
            $scope.inbox.splice(index, 1);
        };
        $scope.changeStatus = function (index) {
            $scope.inbox[index].unread = !$scope.inbox[index].unread;
        };
        $scope.box = $routeParams.box;
    }

    console.log($rootScope.logged);
}]);