define(['ojs/ojcore', 'knockout', 'jquery', 'moment', 'ojs/ojnavigationlist', 'calendar/loader'],
  function (oj, ko, $, moment) {

    function ReportsSidePanelViewModel(params) {

      var self = this;

      self.rootRouter = oj.Router.rootInstance;

      self.parentRouter = self.rootRouter.getChildRouter('batchReports');

      self.parentData = params;

      //self.user = params.user;

      self.search = ko.observableArray();

      self.pages = [
        {id: 'reports', label: 'Reports'},
        {id: 'createReport', label: 'Create report'}
      ];

      self.date = {};
      self.date.period = ko.observable('month');
      self.date.first = ko.observable(moment().subtract(1, self.date.period()).startOf(self.date.period()).toDate());
      self.date.second = ko.observable(self.date.first());

      self.calendarParams = {
        date: self.date,
        isLocalizationLoaded: self.parentData.isLocalizationLoaded,
        tabs: {

          month: {
            visible: true
          }

        }
      };

      self.searchSuggestions = ['0', '1'];

      self.handleActivated = function (info) {
        // Implement if needed
      };

      self.handleAttached = function (info) {
        // Implement if needed
      };

      self.handleBindingsApplied = function (info) {
        // Implement if needed
      };

      self.handleDetached = function (info) {
        // Implement if needed
      };

    }

    return ReportsSidePanelViewModel;
  }
);
