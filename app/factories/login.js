'use strict';

angular.module('myApp.login', [])

    .factory('login', ['$http', function ($http) {
        var token = '';
        return {
            setToken: function (login, password) {
                $http({
                    method: 'POST',
                    url: 'http://edi.iem.pw.edu.pl/bach/mail/api/factories',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "login": login,
                        "password": password
                    }
                }).success(function (response) {
                    token = response;
                });
            },
            getToken : function () {
                return token;
            }
        };

    }]);