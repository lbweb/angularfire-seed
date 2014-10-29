/* jshint camelcase:false*/
/* global Firebase */
'use strict';


app.factory('tempInsta', function($firebase, FIREBASE_URL, $rootScope, Databox) {

    var TempInstaStorage = {
        instaPosts: [],
        queryterms: '',
        currentSearchQuery: '',
        counter: 0,
        initalized: false,
        nextMaxTag: 0
    };

    return TempInstaStorage;
});