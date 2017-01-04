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
        messages.unread($rootScope.token, function (response) {
            $scope.unread = response.data.unread_count;
        }, function (response) {
            $scope.unread = 0;
        });
        messages.messages($rootScope.token,function (response) {
            $scope.inbox = response.data;
        }, function (response) {
            $scope.error.msg = response.data.error;
            $scope.error.error = true;
        });
        $scope.decode = function (id) {
            var index;
            for(index in $rootScope.users) {
                if( $rootScope.users[index].uid == id) {
                    return $rootScope.users[index].username;

                }
            }
        };
        $scope.del = function (id) {
            messages.del(id,$rootScope.token, function (response) {
                $scope.error.error = false;
                messages.messages($rootScope.token,function (res) {
                    $scope.inbox = res.data;
                });
            }, function (response) {
                $scope.error.msg = response.data.error;
                $scope.error.error = true;
            });
        };
        $scope.changeStatus = function (id, unread) {

            var status = !unread;

            messages.mark(id,status, $rootScope.token, function (response) {
                if(status) {
                    $scope.unread++;
                }
                else $scope.unread--;

                $scope.error.error = false;
                messages.messages($rootScope.token,function (res) {
                    $scope.inbox = res.data;
                }, function (response) {
                    $scope.error.msg = response.data.error;
                    $scope.error.error = true;
                });
            });
        };
        $scope.box = $routeParams.box;
        $scope.readMsg = function (id, unread) {
            if(unread == true) {
                messages.mark(id,false, $rootScope.token, function (response) {
                }, function (response) {
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