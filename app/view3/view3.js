'use strict';

angular.module('myApp.view3', ['ngRoute','myApp.messages'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$rootScope','$scope', 'messages',function($rootScope,$scope, messages) {

    console.log($rootScope.logged);
    if($rootScope.logged) {
        $scope.dest = "";
        $scope.subject = "";
        $scope.content = "";
        $scope.done = false;
        $scope.sendMsg = function () {
            var msg ={
                content: $scope.content,
                from: $rootScope.myUID, to: parseInt($scope.dest),
                subject: $scope.subject
            };
            console.log(msg);
            messages.send($rootScope.token, msg, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
            $scope.to = null;
            $scope.subject = null;
            $scope.content = null;
            $scope.done = true;
        };
    }

}]);