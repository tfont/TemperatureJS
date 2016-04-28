function load(url)
{
    var ajax = new XMLHttpRequest();

    ajax.open('GET', url, false);
    ajax.onreadystatechange = function ()
    {
        var script = ajax.response || ajax.responseText;

        if (ajax.readyState === 4)
        {
            switch (ajax.status)
            {
                case 200:
                    eval.apply(window, [script]);
                    if (typeof DISPLAY_LIBRARY_LOAD_CONSOLE !== 'undefined' && DISPLAY_LIBRARY_LOAD_CONSOLE === true)
                    {
                        console.log("library loaded: ", url);
                    }
                    break;
                default:
                    console.log("ERROR: library not loaded: ", url);
            }
        }
    };

    ajax.send(null);
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var   head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type  = 'text/javascript';
    script.src   = url;
    script.async = true;
    //script.defer  = true;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;


    // Fire the loading
    head.appendChild(script);
    // to add after the html
    // document.documentElement.appendChild(script);
}

var TJS = TJS || {};
var bootloaders = [];
var includes = [];

TJS.import = function (libary, version)
{
    switch (libary)
    {
        case 'Strings':
            lib = LIBRARY_PATH + 'class/string.js';
            break;
        case 'Ajax':
            lib = LIBRARY_PATH + 'class/ajax.js';
            break;
        case 'Browser':
            lib = LIBRARY_PATH + 'class/browser.js';
            break;
        case 'jQuery':
            lib = LIBRARY_PATH + 'plugins/jquery.js';

    }

    bootloaders.push(lib);
    load(lib);
};

TJS.services = function ()
{
    for (var i = 0; i < arguments.length; i++)
    {
        // str replace and remove 'http:, https:, //
        load('//'+arguments[i]);
    }
}

TJS.include = function ()
{
    includes = arguments;
}

var dom = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
    dom.documentElement.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:lang', 'en');

//var body = dom.createElement("body");
var body = dom.createElementNS('http://www.w3.org/1999/xhtml', 'body');
           dom.documentElement.appendChild(body);

// set timeout is needed because document.body is created after the current continuation finishes
setTimeout(function ()
{
    loadScript('initizer.js');
    loadScript('system.js', main);
}, 0);
