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
            var template = this.responseText;
            var rendered = Mustache.render(template, routeData.controller);
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
        var template = routeData.template;
        var rendered = Mustache.render(template, routeData.controller);
        document.getElementById(bootstrapId).innerHTML = rendered;
    }

    /**
     * return public methods
     */
    return publicMethods;

})();