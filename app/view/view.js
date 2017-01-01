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
            console.log($rootScope.logged);
        }
        $scope.check = function() {
            login.setToken($scope.login,$scope.password, function (res) {
                $rootScope.token = res.token.toString();
            });
            $rootScope.logged = true;
            console.log($rootScope.logged);
        };
        $scope.logOut = function () {
            $rootScope.logged = false;
            console.log($rootScope.logged);
        }
    }]);