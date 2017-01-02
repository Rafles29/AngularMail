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

        $scope.error = {
            error: false,
            msg: ""
        };

        messages.messages($rootScope.token,function (res) {
            $scope.inbox = res.data;
        });
        $scope.del = function (id) {
            messages.del(id,$rootScope.token, function (response) {
                $scope.error.error = false;
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
                messages.messages($rootScope.token,function (res) {
                    $scope.inbox = res.data;
                });
            }, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
                $scope.error.msg = response.data.error;
                $scope.error.error = true;
            });
        };
        $scope.changeStatus = function (id, unread) {

            var status = !unread;

            messages.mark(id,status, $rootScope.token, function (response) {
                $scope.error.error = false;
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
                messages.messages($rootScope.token,function (res) {
                    $scope.inbox = res.data;
                }, function (response) {
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.data);
                    $scope.error.msg = response.data.error;
                    $scope.error.error = true;
                });
            });
        };
        $scope.box = $routeParams.box;
        $scope.readMsg = function (id, unread) {
            if(unread == true) {
                messages.mark(id,false, $rootScope.token, function (response) {
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.data);
                }, function (response) {
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.data);
                    $scope.error.msg = response.data.error;
                    $scope.error.error = true;
                })
            };
        };
        $scope.isMark = function (box) {
            if(box == 'inbox') {
                return true;
            }else return false;
        };

    }
}]);