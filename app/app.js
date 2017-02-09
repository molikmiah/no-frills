// bind appRouter plugin to the router namespace to be used in our web-app
var router = appRouter;

// set up route for this app
router.routeMapper = [
    {
        url: '',
        template: '<h1>Inline template rather than pointing to a url for a view</h1><hr>Hello from the lovely city of {{ city }}.',
        controller: (function () {
            // example of the ideal controller

            // variables
            var city = 'Leeds, UK';

            // return data for use in template
            return {
                city: city
            };
        })()
    },

    {
        url: '#/about',
        templateUrl: '../app/views/about.html',
        controller: (function () {
            // example of the ideal controller

            // variables
            var a = 1;
            var b = 2;
            var sum = a + b;
            var firstName = 'Molik';
            var surname = 'Miah';

            // controller logic
            function fullName(first, last) {
                return first + ' ' + last;
            }

            // return data for use in template
            return {
                a: a,
                sum: sum,
                user: fullName(firstName, surname)
            };
        })()
    },

    {
        url: '#/news',
        templateUrl: '../app/views/news.html'
    }
];

// start router
router.init();