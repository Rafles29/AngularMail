/**
 * Created by rwozn on 30.12.2016.
 */

angular.module('myApp.messages', [])

    .factory('messages', ['$http', function ($http) {
        function getMessages(token, callback) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/messages',
                headers: {
                    "token" : token
                },
                cache: true
            }).then(callback, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            })
        }
        function getMessage(id,token, callback) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/messages/' + id,
                headers: {
                    "token" : token
                },
                cache: true
            }).then(callback, function (response) {
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.data);
            })
        }
        return {
            messages: getMessages,
            message: getMessage
        };
    }]);
