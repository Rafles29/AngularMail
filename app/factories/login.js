'use strict';

angular.module('myApp.login', [])

    .factory('login', ['$http', function ($http) {
        function getToken(login, password, callback) {
            $http({
                method: 'POST',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/login',
                data: {
                    "login": login,
                    "password": password
                }
            }).then(callback, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
        }
        function getUserName(token, id, callback) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/users/' + id,
                headers: {
                    "token" : token
                },
                cache: true
            }).then(callback, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
        }
        function getUserID(token, name, callback) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/users/' + name,
                headers: {
                    "token" : token
                },
                cache: true
            }).then(callback, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
        }
        function getAllUsers(token, callback) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/users/',
                headers: {
                    "token" : token
                },
                cache: true
            }).then(callback, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
        }

        return {
            setToken: getToken,
            getName: getUserName,
            getID: getUserID,
            getUsers: getAllUsers
        };
    }]);