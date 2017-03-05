/*
 * no-frills.js
 * Copyright 2017 Molik Miah, MIT LICENSE.
 * W: http://molikmiah.githib,io | http://molik.co.uk
 *
 * file  : core.router.js
 * group : core-framework
 * desc  : the main routing framework which handles routes and transitions
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
        config: config,
        controllers: {}
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
    var url = null;

    /**
     * This function can be called to navigate to given 'path'
     * @param {string} path
     */
    function _navigate (path) {
        var current = window.location.href;
        window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
    }

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
/*
 * no-frills.js
 * Copyright 2017 Molik Miah, MIT LICENSE.
 * W: http://molikmiah.githib,io | http://molik.co.uk
 *
 * file  : core.template-engine.js
 * group : core-framework
 * desc  : handles getting/rendering templates and binding view to a controller
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
        getTplUrl: _getTemplate,
        getTpl: _processTemplate
    };

    /**
     * Template loader from seperate .html view file, parses data and injects into the view
     * @param {string} routeData This routeData object contains the filePath and data
     * @param {string} bootstrapId This is where the template will be injected
     */
    function _getTemplate(routeData, bootstrapId) {
        // validation, only allow getTemplate() to be used to get .html files
        if (routeData.templateUrl.includes('.html') === false) {
            throw new Error('getTemplate() can only be used to get .html template files. Please ensure ' +
            'the correct path is used as \'' + routeData.templateUrl + '\' is not valid!');
        }

        // get file request
        var xhr= new XMLHttpRequest();
        xhr.open('GET', routeData.templateUrl, true);
        xhr.onreadystatechange= function() {
            if (this.readyState !== 4 || this.status !== 200) {
                // error handling
                return false;
            }

            // on success
            // get controller for this view
            var controller = null;
            if (routeData.controller) {
                controller = appRouter.controllers[routeData.controller];
            }

            // log error if we cannot find the controller defined in the router
            if (typeof controller === 'undefined') {
                throw new Error('Error rendering template. Cannot find controller "' + routeData.controller + '".');
            }

            // parse template
            var template = this.responseText;
            var rendered = Mustache.render(template, controller);
            document.getElementById(bootstrapId).innerHTML = rendered;
        };

        xhr.send();
    }

    /**
     * Template data parser and injects into the view
     * @param {string} routeData This routeData object contains the filePath and data
     * @param {string} bootstrapId This is where the template will be injected
     */
    function _processTemplate(routeData, bootstrapId) {
        // get controller for this view
        var controller = appRouter.controllers[routeData.controller];

        // parse template
        var template = routeData.template;
        var rendered = Mustache.render(template, controller);
        document.getElementById(bootstrapId).innerHTML = rendered;
    }

    /**
     * return public methods
     */
    return publicMethods;

})();
/*
 * no-frills.js
 * Copyright 2017 Molik Miah, MIT LICENSE.
 * W: http://molikmiah.githib,io | http://molik.co.uk
 *
 * file  : core.constructores.js
 * group : core-framework
 * desc  : handles the main contructors used in the framework.
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