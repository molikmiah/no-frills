//////////////////////////////////////////////////
// A lightweight router developed by Molik Miah //
//////////////////////////////////////////////////

/**
 * This function can be called to navigate to given 'path'
 * @param {string} path
 */
function navigate (path) {
  var current = window.location.href;
  window.location.href = current.replace(/#(.*)$/, '') + '#' + path;
}

/**
 * Sets up a listener to watch the url hash and when this changes it will
 * trigger the loadPage()
 * @param {number} delay The timer delay in ms
 */
var url = null;
function listen (delay) {
  var current = window.location.hash;

  if (current !== url) {
    console.log('URL changed to ' + current);
    url = current;
    loadPage(current, 'myApp');
  }

  setTimeout(listen, delay);
}

/**
 * This will load the page view and insire it into the html element which matches the
 * bootstrap id.
 * @param {string} param This is the hash and it will be used to determine which template to inject
 * @param {string} bootstrapId This is the html element id used to insert the template content
 */
function loadPage (param, bootstrapId) {
    // DOM insert
    switch (param) {
        case '':
            document.getElementById(bootstrapId).innerHTML = '<h1>Home</h1>';
            break;

        case '#/about':
            getTemplate('/views/about.html', bootstrapId);
            break;

        case '#/news':
            getTemplate('/views/news.html', bootstrapId);
            break;

        default:
            break;
    }
}

/**
 * Template loader and injector
 * @param {string} filePath This is the file path to the html view you want to load
 */
function getTemplate(filePath, bootstrapId) {
    // validation, only allow getTemplate() to be used to get .html files
    if (filePath.includes('.html') === false) {
        throw new Error('getTemplate() can only be used to get .html template files. Please ensure ' + 
        'the correct path is used as \'' + filePath + '\' is not valid!');
    }

    // get file request
    var xhr= new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onreadystatechange= function() {
        if (this.readyState !== 4) {
            return;
        }
        if (this.status !== 200) {
            // error handling
            return;
        }

        // on success
        document.getElementById(bootstrapId).innerHTML= this.responseText;
    };

    xhr.send();
}

// trigger listener
listen(200);