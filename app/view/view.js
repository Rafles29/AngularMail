'use strict';

angular.module('myApp.view', ['ngRoute','myApp.login'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view', {
            templateUrl: 'view/view.html',
            controller: 'ViewCtrl'
        });
    }])

    .controller('ViewCtrl', ['$rootScope','$scope','login' ,function($rootScope,$scope,login) {
        $scope.login = "";
        $scope.password = "";
        if($rootScope.logged == null) {
            $rootScope.logged = false;
        }
        $scope.error = {
            error: false,
            msg: ""
        };
        $scope.check = function() {
            login.setToken($scope.login,$scope.password, function (res) {
                $scope.error.error = false;
                $rootScope.token = res.data.token;
                $rootScope.logged = true;
                login.getID($rootScope.token, $scope.login, function (res) {
                    $rootScope.myUID = res.data.uid;
                });
                login.getUsers($rootScope.token, function (response) {
                    $rootScope.users = response.data;
                    console.log($rootScope.users);
                });
            }, function (res) {
                $scope.error.msg = res.data.error;
                $scope.error.error = true;
                $scope.login = "";
                $scope.password = "";
            });
        };
        $scope.logOut = function () {
            $rootScope.logged = false;
        }
    }]);