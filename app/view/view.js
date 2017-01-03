'use strict';

angular.module('myApp.view', ['ngRoute','myApp.login'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view', {
            templateUrl: 'view/view.html',
            controller: 'ViewCtrl'
        });
    }])

    .controller('ViewCtrl', ['$rootScope','$scope','login' ,function($rootScope,$scope,login) {
        $scope.login = "bach";
        $scope.password = "to-nie-ja";
        if($rootScope.logged == null) {
            $rootScope.logged = false;
        }
        $scope.check = function() {
            login.setToken($scope.login,$scope.password, function (res) {
                $rootScope.token = res.data.token;
                $rootScope.logged = true;
                login.getID($rootScope.token, $scope.login, function (res) {
                    $rootScope.myUID = res.data.uid;
                })
            });
        };
        $scope.logOut = function () {
            $rootScope.logged = false;
        }
    }]);