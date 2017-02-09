/*
 _______ _______ _______ _______ _______
|\     /|\     /|\     /|\     /|\ .js /|
| +---+ | +---+ | +---+ | +---+ | +---+ |
| |   | | |   | | |   | | |   | | |   | |
| |M  | | |o  | | |l  | | |i  | | |k  | |
| +---+ | +---+ | +---+ | +---+ | +---+ |
|/_____\|/_____\|/_____\|/_____\|/_____\|
*/

/**
 * Namespace
 */
var tpl = (function () {

    'use strict';

    /**
     * Public Methods and Public Variables to return from this module
     */
    var publicMethods = {
        methodOne: _methodOne,
        config: config
    };

    /**
     * Configuration
     * @property {object} config The default configuration for the template engine
     * @property {number} config.prop1 This is for...
     * @property {string} config.prop2 This is for...
     */
    var config = {
        prop1: null,
        prop2: null
    };

    /**
     * This does...
     * @param {string} path
     */
    function _methodOne (path) {
        // do something
    }

    /**
     * return public methods
     */
    return publicMethods;

})();