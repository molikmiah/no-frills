/*
 _______ _______ _______ _______ _______
|\     /|\     /|\     /|\     /|\     /|
| +---+ | +---+ | +---+ | +---+ | +---+ |
| |   | | |   | | |   | | |   | | |   | |
| |M  | | |o  | | |l  | | |i  | | |k  | |
| +---+ | +---+ | +---+ | +---+ | +---+ |
|/_____\|/_____\|/_____\|/_____\|/_____\|
*/

/**
 * App Router handles the core functionality.
 */
var appRouter = (function () {

    'use strict';

    /**
     * Public Methods and Public Variables to return from this module
     */
    var publicMethods = {
        navigate: _navigate,
        init: _listen,
        routeMapper: null,
        config: config
    };

    /**
     * Configuration
     * @property {object} config The default configuration for the appRouter
     * @property {number} config.defaultRouteCheckerDelay  The delay in ms for the router to check for url changes
     * @property {string} config.bootstrapId This is the id of the element used for injecting templates and views
     */
    var config = {
        defaultRouteCheckerDelay: 200,
        bootstrapId: 'myApp'
    };

    /**
     * This function can be called to navigate to given 'path'
     * @param {string} path
     */
    function _navigate (path) {
        var current = window.location.href;
        window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
    }

    var url = null;
    /**
     * Sets up a listener to watch the url hash and when this changes it will
     * trigger the loadPage()
     * @param {number} delay The timer delay in ms
     */
    function _listen (delay) {
        // default delay if none specified
        if (!delay) {
            delay = config.defaultRouteCheckerDelay;
        }

        // store current location hash
        var current = window.location.hash;

        if (current !== url) {
            url = current;
            _loadPage(current, config.bootstrapId);
        }

        setTimeout(_listen, delay);
    }

    /**
     * This will load the page view and insire it into the html element which matches the
     * bootstrap id.
     * @param {string} param This is the hash and it will be used to determine which template to inject
     * @param {string} bootstrapId This is the html element id used to insert the template content
     */
    function _loadPage (param, bootstrapId) {
        // find the correct route object from the Array of route definitions
        var requestedRouteObject = appRouter.routeMapper.find(function(routeObj) {
            return routeObj.url === param;
        });

        // if a templateUrl is defined, then use getTemplate()
        if (typeof requestedRouteObject.templateUrl !== 'undefined') {
            _getTemplate(requestedRouteObject.templateUrl, bootstrapId);
        }

        // if a template is defined, then inject this html from the string
        if (typeof requestedRouteObject.template !== 'undefined') {
            document.getElementById(bootstrapId).innerHTML = requestedRouteObject.template;
        }
    }

    /**
     * Template loader and injector
     * @param {string} filePath This is the file path to the html view you want to load
     */
    function _getTemplate(filePath, bootstrapId) {
        // validation, only allow getTemplate() to be used to get .html files
        if (filePath.includes('.html') === false) {
            throw new Error('getTemplate() can only be used to get .html template files. Please ensure ' +
            'the correct path is used as \'' + filePath + '\' is not valid!');
        }

        // get file request
        var xhr= new XMLHttpRequest();
        xhr.open('GET', filePath, true);
        xhr.onreadystatechange= function() {
            if (this.readyState !== 4 || this.status !== 200) {
                // error handling
                return false;
            }

            // on success
            document.getElementById(bootstrapId).innerHTML= this.responseText;
        };

        xhr.send();
    }

    /**
     * return public methods
     */
    return publicMethods;

})();