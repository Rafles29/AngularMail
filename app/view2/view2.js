'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.login', 'myApp.messages'])

.config(['$routeProvider' , function($routeProvider) {
  $routeProvider.when('/view2/:box', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$rootScope','$scope','$http', '$routeParams', 'messages', function($rootScope,$scope, $http, $routeParams, messages) {


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
        $scope.readMsg = function (id, unread) {
            if(unread == true) {
                messages.mark(id,false, $rootScope.token, function (response) {
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.data);
                })
            }
        };
        $scope.isMark = function (box) {
            if(box == 'inbox') {
                return true;
            }else return false;
        };

    }
}]);