'use strict';

angular.module('myApp.view3', ['ngRoute','myApp.messages'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$rootScope','$scope', 'messages',function($rootScope,$scope, messages) {

    if($rootScope.logged) {
        $scope.handler = {
            status: false,
            msg: ""
        };
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
            messages.send($rootScope.token, msg, function (response) {
                $scope.dest = "";
                $scope.subject = "";
                $scope.content = "";
                $scope.handler.msg = 'The message has been sent';
                $scope.handler.status = true;

            }, function (response) {
                $scope.handler.status = true;
                if(response.data) {
                    $scope.handler.msg = response.data.errors[0];

                }else {
                    $scope.handler.msg = 'An unknown error has occurred';
                }
            });
            $scope.to = null;
            $scope.subject = null;
            $scope.content = null;
        };
    }

}]);