define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojnavigationlist', 'ojs/ojjsontreedatasource'],
  function(oj, ko, $) {

    function SidePanelViewModel(params) {

      var self = this;

      self.router = oj.Router.rootInstance;

      self.rootData = params;

      self.toggleTopPanel = function() {
        self.rootData.isSidePanelToggled(!self.rootData.isSidePanelToggled());
      };

      self.search = ko.observableArray();

      // self.parentData = params;
      //
      // self.calendarParamsFirst = {
      //   date: self.parentData.date,
      //   isLocalizationLoaded: self.parentData.isLocalizationLoaded,
      //   tabs: {
      //     day: {
      //       visible: true,
      //       label: 'от'
      //     },
      //     week: {},
      //     month: {
      //       visible: true,
      //       label: 'от'
      //     },
      //     year: {
      //       visible: true,
      //       label: 'от'
      //     }
      //   },
      //   activeDate: 'first'
      // };
      //
      // self.calendarParamsSecond = {
      //   date: self.parentData.date,
      //   isLocalizationLoaded: self.parentData.isLocalizationLoaded,
      //   tabs: {
      //     day: {},
      //     week: {},
      //     month: {
      //       visible: true,
      //       label: 'до'
      //     },
      //     year: {}
      //   },
      //   activeDate: 'second'
      // };

      self.handleActivated = function(info) {
        // Implement if needed
      };

      self.handleAttached = function(info) {
        // Implement if needed
      };

      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    return SidePanelViewModel;
  }
);
