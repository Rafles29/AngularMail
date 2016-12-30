'use strict';

angular.module('myApp.view', ['ngRoute','myApp.login'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view', {
            templateUrl: 'view/view.html',
            controller: 'ViewCtrl'
        });
    }])

    .controller('ViewCtrl', ['$scope','$http',function($scope) {

    }]);