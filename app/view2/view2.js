'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.login'])

.config(['$routeProvider' , function($routeProvider) {
  $routeProvider.when('/view2/:box', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$http', '$routeParams', 'login',function($scope, $http, $routeParams, login) {
    /*$http.get('messages.json').success(function (data) {
        $scope.inbox = data;
    });*/

    login.setToken("bach","to-nie-ja", function (res) {
        console.log(res);
    });

    $scope.del = function (index) {
        $scope.inbox.splice(index, 1);
    };
    $scope.changeStatus = function (index) {
        $scope.inbox[index].unread = !$scope.inbox[index].unread;
    };
    $scope.box = $routeParams.box;

}]);