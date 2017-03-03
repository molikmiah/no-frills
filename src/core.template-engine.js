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