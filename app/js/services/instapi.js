/* jshint camelcase:false */
'use strict';

/**
 * @ngdoc service
 * @name instaViewApp.instAPI
 * @description
 * # instAPI
 * Service in the instaViewApp.
 */



app.service('instaAPI', function instAPI($http, $log) {
    //PRIVATE DATA HERE
    var clientId = '83fda0f59e60415e882fade44598c53f';
    // var searchUrl = 'https://api.instagram.com/v1/tags/cycloneyasi/media/recent?client_id=' + clientId + '&callback=JSON_CALLBACK';
    //var querycycle = 'https://api.instagram.com/v1/tags/cycloneyasi/media/recent?client_id=' + clientId + '&callback=JSON_CALLBACK';
    //PUBLIC RETURN OBJECT HERE
    return {
        getTagQuery: function(queryTerms, max_id) {
            if (max_id === undefined) {
                return $http.jsonp('https://api.instagram.com/v1/tags/' + queryTerms + '/media/recent?client_id=' + clientId + '&callback=JSON_CALLBACK');
            } else {
                return $http.jsonp('https://api.instagram.com/v1/tags/' + queryTerms + '/media/recent?client_id=' + clientId + '&callback=JSON_CALLBACK' + '&max_tag_id=' + max_id);
            }
        },
        getTagCount: function(queryTerms) {
            return $http.jsonp('https://api.instagram.com/v1/tags/' + queryTerms + '?client_id=' + clientId + '&callback=JSON_CALLBACK');
        }
    };

});