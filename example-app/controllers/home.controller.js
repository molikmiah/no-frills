/**
 * Controller for Home
 */
appRouter.controllers.homeCtrl = new Controller(function() {
    // variables
    var city = 'Leeds, UK';

    // return data for use in template
    return {
        city: city
    };
});