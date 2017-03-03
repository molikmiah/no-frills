/**
 * Controller for AboutUs
 */
appRouter.controllers.aboutCtrl = new Controller(function() {
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
});