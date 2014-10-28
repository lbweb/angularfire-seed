/* global Firebase */
'use strict';


app.factory('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope, Databox, User, $q) {
    var ref = new Firebase(FIREBASE_URL);

    var fireAuth = $firebaseSimpleLogin(ref);

    var Auth = {
        register: function(user) {
            var deferred = $q.defer();
            fireAuth.$createUser(user.email, user.password).then(function(userData) {
                User.createUser(userData).then(function(e) {
                    if (e.uid !== null) {
                        fireAuth.$login('password', user);
                        deferred.resolve(e);
                    }
                });
            }, function(error) {
                var notice = 'test';
                if (error.code === 'INVALID_EMAIL') {
                    notice = 'Sorry, the email address provided is invalid';
                } else if (error.code === 'EMAIL_TAKEN') {
                    notice = 'Sorry, the email address provided is already in use';
                }
                deferred.reject(notice);
            });
            return deferred.promise;
        },
        signedIn: function() {
            return fireAuth.user !== null;
        },
        getCurrentUser: function() {
            return fireAuth.$getCurrentUser();
        },
        login: function(user) {
            return fireAuth.$login('password', user);
        },
        logout: function() {
            fireAuth.$logout();
        }
    };



    return Auth;

});