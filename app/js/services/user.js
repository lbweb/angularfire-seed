/* global Firebase */
'use strict';


app.factory('User345', function($firebase, FIREBASE_URL, $rootScope, $q) {

    var refurl = FIREBASE_URL + 'users/';
    var ref = new Firebase(refurl);
    var sync = $firebase(ref);
    var list = sync.$asArray();


    var User = {
        createUser: function(userObj) {
            var deferred = $q.defer();

            sync.$set(userObj.uid, userObj.user).then(function(returndata) {
                deferred.resolve(returndata);
            });

            return deferred.promise;
        },
        listUsers: function(uid) {

            var fullList = list.$loaded().then(function() {
                console.log('list has' + list.length + 'items');
                return list;
            });
            return fullList;
        }
    };


    return User;

});