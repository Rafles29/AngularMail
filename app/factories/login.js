'use strict';

angular.module('myApp.login', [])

    .factory('login', ['$http', function ($http) {
        return {
            setToken: function (login, password, callback) {
                $http({
                    method: 'POST',
                    url: 'http://edi.iem.pw.edu.pl/bach/mail/api/login',
                    data: {
                        "login": login,
                        "password": password
                    },
                    cache: true

                }).success(callback).error(function () {
                    console.log('ups');
                });
            }
        };

    }]);