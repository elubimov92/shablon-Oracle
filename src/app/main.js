/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */


requirejs.config({

  baseUrl: '.',

  // Path mappings for the logical module names
  paths:
  //injector:mainReleasePaths
    {
      'knockout': 'app/libs/knockout/knockout-3.4.0.debug',
      'jquery': 'app/libs/jquery/jquery-3.1.0',
      'jqueryui-amd': 'app/libs/jquery/jqueryui-amd-1.12.0',
      'promise': 'app/libs/es6-promise/es6-promise',
      'hammerjs': 'app/libs/hammer/hammer-2.0.8',
      'ojdnd': 'app/libs/dnd-polyfill/dnd-polyfill-1.0.0',
      'ojs': 'app/libs/oj/v2.3.0/debug',
      'ojL10n': 'app/libs/oj/v2.3.0/ojL10n',
      'ojtranslations': 'app/libs/oj/v2.3.0/resources',
      'text': 'app/libs/require/text',
      'signals': 'app/libs/js-signals/signals',
      'customElements': 'app/libs/webcomponents/CustomElements',
      'proj4': 'app/libs/proj4js/dist/proj4-src',
      'moment': 'app/libs/moment/min/moment-with-locales',
      'devextreme': 'app/libs/devextreme/dx.custom',
      'googleCharts': 'https://www.gstatic.com/charts/loader',
      'css2pdf': 'app/libs/css2pdf/xepOnline.jqPlugin',
      'components': 'app/components',
      'sidePanel': 'app/components/panel/side',
      'calendar': 'app/components/calendar'
      //endinjector
    },

  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  },

  config: {
    ojL10n: {
      merge: {
        'ojtranslations/nls/ojtranslations': 'app/resources/nls/translations'
      }
    }
  }

});

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'app/appController', 'ojs/ojknockout', 'jquery',
  'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar', 'googleCharts'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded

    oj.ModuleBinding.defaults.modelPath = 'app/';
    oj.ModuleBinding.defaults.viewPath = 'text!app/';

    $(function() {

      function init() {
        oj.Router.sync().then(
          function () {
            // Bind your ViewModel for the content of the whole page body.
            ko.applyBindings(app, document.getElementById('globalBody'));
          },
          function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
          }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.

      function start() {
        if ($(document.body).hasClass('oj-hybrid')) {
          document.addEventListener("deviceready", init);
        } else {
          init();
        }
      }

      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(start);

    });

  }
);
