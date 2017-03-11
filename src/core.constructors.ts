/*!
 * no-frills.js
 * Copyright 2017 Molik Miah, MIT LICENSE.
 * W: http://molikmiah.githib,io | http://molik.co.uk
 *
 * file  : core.constructors.ts
 * group : core-framework
 * desc  : handles the main contructors used in the framework.
 *
 * 3rd party dependcies: mustache.js
*/

/**
 * Controller constructor used to evaluate and return data
 * @example
 * var appRouter.controllers.controllerNameHere = new Controller(function() {
 *  // you code will go here
 *  // your controller code should return data to be consumed by
 *  // the template it is linked to
 * });
 */
function Controller(evaluate) {
    if (typeof evaluate === 'function') {
        return evaluate();
    }
}