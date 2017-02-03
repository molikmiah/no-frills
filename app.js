// start appRouter
// bind appRouter plugin to the router namespace to be used in our web-app
var router = appRouter;


// set up routes
router.routeMapper = [
    {
        url: '',
        template: '<h1>Inline template rather than pointing to a url for a view</h1>'
    },

    {
        url: '#/about',
        templateUrl: '/views/about.html'
    },

    {
        url: '#/news',
        templateUrl: '/views/news.html'
    }
];

router.init();