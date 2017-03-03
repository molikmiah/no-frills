/**
 * This is an example app.js which would be created by the web-app developer.
 * This file was created while developing the routing framework.
 */

// bind appRouter plugin to the router namespace to be used in our web-app
var router = appRouter;

// set up route for this app
router.routeMapper = [
    {
        url: '',
        template: '<h1>Inline template rather than pointing to a url for a view</h1><hr>Hello from the lovely city of {{ city }}.',
        controller: 'homeCtrl'
    },

    {
        url: '#/about',
        templateUrl: '../example-app/views/about.html',
        controller: 'aboutCtrl'
    },

    {
        url: '#/news',
        templateUrl: '../example-app/views/news.html'
    }
];