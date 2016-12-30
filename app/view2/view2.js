'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:box', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope','$http', '$routeParams',function($scope, $http, $routeParams) {
    $http.get('messages.json').success(function (data) {
        $scope.inbox = data;
    });
    $scope.del = function (index) {
        $scope.inbox.splice(index, 1);
    };
    $scope.changeStatus = function (index) {
        $scope.inbox[index].unread = !$scope.inbox[index].unread;
    };
    $scope.box = $routeParams.box;

}]);