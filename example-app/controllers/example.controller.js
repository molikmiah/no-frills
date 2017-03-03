/**
 * Controller for Example
 */
appRouter.controllers.exampleControllerNameHere = new Controller(function() {
        // controller logic goes here
    function sum(a, b) {
        return a + b;
    }

    // variables
    var magicNumber = sum(10, 50);

    // return any data that will be consumed by a template
    return {
        myAge: magicNumber
    };
});