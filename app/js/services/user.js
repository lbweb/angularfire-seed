/* global Firebase */
'use strict';


app.factory('User', function($firebase, FIREBASE_URL, $rootScope, $q, simpleLogin) {

    var refurl = FIREBASE_URL + 'users/';
    var ref = new Firebase(refurl);
    var sync = $firebase(ref);
    var list = sync.$asArray();


    function saveSpot(maxTag, queryTerms) {

        var deferred = $q.defer();

        simpleLogin.getUser().then(function(user){
            

        var ref = new Firebase(FIREBASE_URL + '/users/' + user.uid + '/Spots/' + $rootScope.activeDataBox.$id);
        var obj = $firebase(ref).$asObject();
       
        obj.$loaded()
            .then(function(data) {
                data.maxTag = maxTag;
                data.modified = Date.now();
                data.queryTerms = queryTerms;
                obj = data;
                obj.$save().then(function(ref) {
                    if(ref.name() === obj.$id) { // true
                    obj.$destroy();
                    deferred.resolve(ref);
                    }
                });
            });


        });

        return deferred.promise;
    }


    function getSpot(maxTag, queryTerms) {

        var deferred = $q.defer();

        simpleLogin.getUser().then(function(user){
            

        var ref = new Firebase(FIREBASE_URL + '/users/' + user.uid + '/Spots/' + $rootScope.activeDataBox.$id);
        var obj = $firebase(ref).$asObject();
       
        obj.$loaded()
            .then(function(data) {                    
                    deferred.resolve(data);
            });
           
        });

        return deferred.promise;
    }



    var User = {
        getPreviousQuery: function() {
            return getSpot(); 
        },
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
        },
        saveMySpot: function(maxTag, queryTerms) {
            return saveSpot(maxTag, queryTerms);
        }
    };


    return User;

});