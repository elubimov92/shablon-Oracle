define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojcheckboxset'],
  function(oj, ko, $) {

    function TopPanelViewModel(params) {
      var self = this;

      self.dataParent = params;

      self.calendarParamsFirst = {
        date: self.dataParent.date,
        isLocalizationLoaded: self.dataParent.isLocalizationLoaded,
        tabs: {
          day: {},
          week: {},
          month: {
            visible: true,
            label: 'от'
          },
          year: {}
        },
        activeDate: 'first'
      };

      self.calendarParamsSecond = {
        date: self.dataParent.date,
        isLocalizationLoaded: self.dataParent.isLocalizationLoaded,
        tabs: {
          day: {},
          week: {},
          month: {
            visible: true,
            label: 'до'
          },
          year: {}
        },
        activeDate: 'second'
      };

      self.articleSettings = ko.observable([]);

      self.handleActivated = function(info) {
      };


      self.handleAttached = function(info) {
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return TopPanelViewModel;
  }
);
