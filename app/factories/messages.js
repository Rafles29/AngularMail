/**
 * Created by rwozn on 30.12.2016.
 */

angular.module('myApp.messages', [])

    .factory('messages', ['$http', function ($http) {
        function getMessages(token, callback, error) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/messages',
                headers: {
                    "token" : token
                }
            }).then(callback, error);
        }
        function handleMessage(method,id,token, callback, error) {
            $http({
                method: method,
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/messages/' + id,
                headers: {
                    "token" : token
                }
            }).then(callback, error);
        }
        function getMessage(id,token,callback, error) {
            handleMessage('GET',id,token,callback, error);
        }
        function deleteMessage(id,token,callback, error) {
            handleMessage('DELETE',id,token,callback, error);
        }
        function markMessage(id,mark,token,callback, error) {
            $http({
                method: 'PUT',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/messages/' + id,
                headers: {
                    "Content-Type": "application/json",
                    "token" : token
                },
                data: {
                    "unread": mark,
                }
            }).then(callback, error);
        }
        function sendMessage(token, msg,callback, error) {
            $http({
                method: 'POST',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/messages',
                headers: {
                    "Content-Type": "application/json",
                    "token" : token
                },
                data: {
                    "content": msg.content,
                    "from": msg.from, "to": msg.to,
                    "subject": msg.subject
                }
            }).then(callback, error);
        }
        function unreadCount(token, callback, error) {
            $http({
                method: 'GET',
                url: 'http://edi.iem.pw.edu.pl/bach/mail/api/messages/unread/count',
                headers: {
                    "token" : token
                }
            }).then(callback, error);
        }
        return {
            messages: getMessages,
            message: getMessage,
            send: sendMessage,
            del: deleteMessage,
            mark: markMessage,
            unread: unreadCount
        };
    }]);
