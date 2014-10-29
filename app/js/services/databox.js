/* jshint camelcase:false*/
/* global Firebase */
'use strict';


app.factory('Databox', function($firebase, FIREBASE_URL, $rootScope, $q, $location, $timeout, simpleLogin) {




    var UserDatabox = {};
    var activeDataboxId = null;
    var AllDataboxes = {};
    var allSync = null;
    /*
    PRIVATE FUNCTION THAT SYNCS DATABOXES PER USER
    */
    function loadUserDataboxes(uid) {
        var ref = new Firebase(FIREBASE_URL + '/databoxes/' + uid);
        var sync = $firebase(ref);
        var databoxes = sync.$asArray();
        UserDatabox = databoxes;
      
    }



   

    function loadAllDataboxes(uid, databoxKey) {
        var allRef = new Firebase(FIREBASE_URL + '/databoxes/' + uid + '/' + databoxKey);
        console.log(uid);
        allSync = $firebase(allRef);
    }

    function setActiveDataBox(id) {
        activeDataboxId = id;
        console.log('activeDataboxIS='+ activeDataboxId);
        $rootScope.activeDataBox = UserDatabox[id];
    }

    var Databox = {
        initialLoad: function(uid) {
              loadUserDataboxes(uid);
              return UserDatabox.$loaded();
        },
        login: function(uid, callback) {
        
                      Databox.initialLoad(uid).then(function(data) {


                            angular.forEach(data, function(value, key) {

                                        console.log(value);
                              if (value.isActive === true) {
                                  Databox.setActive(key, function(val) {
                                       console.log('you are now logged in and Databox is active');   
                                       console.log(UserDatabox[activeDataboxId])  ; 
                                       if (typeof callback=="function") callback(true);              
                                 
                                  });
                              }
                        });
                    }); 
            
            
        }, 
        list: function() {
            return UserDatabox;
        },
        listOthers: function(id) {
            console.log(id);
        },
        addOthers: function(uid, databoxData) {
            var deferred = $q.defer();
            var tempObj = angular.copy(databoxData);
            loadAllDataboxes(uid, tempObj.$id);
            delete tempObj.$id;
            delete tempObj.$priority;
            allSync.$set(tempObj).then(function(result) {
                deferred.resolve(result);
            });
            return deferred.promise;
        },
        setActive: function(id, callback) {
            console.log(UserDatabox);
            if (activeDataboxId !== null) {
                UserDatabox[activeDataboxId].isActive = false;
                UserDatabox.$save(activeDataboxId).then(function() {
                    UserDatabox[id].isActive = true;
                    UserDatabox.$save(id).then(function() {
                        setActiveDataBox(id);
                        callback(true);
                    });
                });
            } else if (activeDataboxId === null) {
             
                UserDatabox[id].isActive = true;
                UserDatabox.$save(id).then(function() {
                    setActiveDataBox(id);
                    callback(true);
                });
            }
        },
        create: function(databox) {
            return UserDatabox.$add(databox);
        },
        delete: function(ref) {
            return UserDatabox.$remove(ref);
        }
    };

    return Databox;
});