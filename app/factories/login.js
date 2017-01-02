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
            }).success(callback).error(function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
        }
        function getUser(token, link, callback) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/users/' + link,
                headers: {
                    "token" : token
                },
                cache: true
            }).success(callback).error(function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
        }
        function getById(token, id, callback) {
            getUser(token,id,callback);
        }
        function getByName(token, name, callback) {
            getUser(token,name,callback);
        }
        function getAllUsers(token, callback) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/users/',
                headers: {
                    "token" : token
                },
                cache: true
            }).success(callback).error(function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            });
        }
        return {
            setToken: getToken,
            getName: getById,
            getID: getByName,
            getUsers: getAllUsers
        };
    }]);