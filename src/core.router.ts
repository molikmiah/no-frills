/*!
 * no-frills.js
 * Copyright 2017 Molik Miah, MIT LICENSE.
 * W: http://molikmiah.githib,io | http://molik.co.uk
 *
 * file  : core.router.ts
 * group : core-framework
 * desc  : the main routing framework which handles routes and transitions
 *
 * 3rd party dependcies: mustache.js
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
        routeMapper: <any>{},
        config: config,
        controllers: <any>[]
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
     * Private var used by the _listen() function
     */
    var url: string;

    /**
     * This function can be called to navigate to given 'path'
     * @param {string} path
     */
    function _navigate (path: string) {
        var current = window.location.href;
        window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
    }

    /**
     * Sets up a listener to watch the url hash and when this changes it will
     * trigger the loadPage()
     * @param {number} delay The timer delay in ms
     */
    function _listen (delay?: number) {
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
    function _loadPage (param: string, bootstrapId: string) {
        // find the correct route object from the Array of route definitions
        var requestedRouteObject = appRouter.routeMapper.find(function(routeObj: any) {
            return routeObj.url === param;
        });

        // if a templateUrl is defined, then use template parser
        if (typeof requestedRouteObject.templateUrl !== 'undefined') {
            tpl.getTplUrl(requestedRouteObject, bootstrapId);
        }

        // if an inline-template is defined, then parse
        if (typeof requestedRouteObject.template !== 'undefined') {
            tpl.getTpl(requestedRouteObject, bootstrapId);
        }
    }

    /**
     * return public methods
     */
    return publicMethods;

})();

/**
 * Initialize the router and molik.js framework after everything is loaded
 * for the app
 */
document.addEventListener("DOMContentLoaded", function() {
  appRouter.init();
});