define(['ojs/ojcore', 'knockout', 'jquery', 'moment', 'calendar/popup/loader', 'calendar/tab-content/loader'],
  function(oj, ko, $, moment) {

    function CalendarViewModel(context) {
      var self = this;

      context.props.then(function(properties) {
        oj.Logger.log('calendar -', 'properties are', properties);
        self.parentData = properties.data;

        self.periods = [
          new Period('day'),
          new Period('week'),
          new Period('month'),
          new Period('year')
        ];

        self.info = {};

        function getType() {
          for (var i = 0; i < self.periods.length; i++) {
            var item = self.periods[i];
            if (self.parentData.tabs[item.id]) {
              return item.id;
            }
          }
        }

        self.info.type = ko.observable(getType());
        self.info.isPeriodSelector = ko.observable(false);
        self.info.singleDate = ko.observable(self.parentData.activeDate);

        self.firstDate = self.parentData.activeDate === 'second' ? self.parentData.date.second : self.parentData.date.first;
        self.secondDate = self.parentData.activeDate === 'first' ? self.parentData.date.first : self.parentData.date.second;

        self.calendarId = ko.pureComputed(function() {
          const activeDate = self.parentData.activeDate;
          return 'calendar' + (activeDate ? activeDate.charAt(0).toUpperCase() + activeDate.slice(1) : '');
        });

        self.showTab = function(name) {
          return self.parentData.tabs[name] && self.parentData.tabs[name].visible;
        };

        var tabsCount = 0;

        $.each(self.parentData.tabs, function() {
          tabsCount++;
        });

        self.isMultitabCalendar(tabsCount > 1);

        oj.Logger.log('calendar -', 'is multi tab', self.isMultitabCalendar());

        self.calendarPopupParams = {
          firstDate: self.firstDate,
          secondDate: self.secondDate,
          info: self.info,
          formatDate: formatDate,
          popup: self.popup,
          id: self.calendarId
        };

        self.calendarTabContentParams = {
          firstDate: self.firstDate,
          secondDate: self.secondDate,
          info: self.info,
          formatDate: formatDate,
          popup: self.popup
        };

      });

      self.isMultitabCalendar = ko.observable(true);

      function Period(id) {
        this.id = id;
        var tab = self.parentData.tabs[id];
        this.label = tab && tab.label ? tab.label : this.id;
      };

      self.changeType = function(type) {
        self.info.type(type);
      };

      function formatDate(date, format) {
        // Call this property each time to make sure that values recomputes on language change
        self.parentData.isLocalizationLoaded();
        return moment(date()).format(format);
      };

      // Contains state of calendar popup
      self.popup = {};

      self.popup.isOpen = ko.observable(false);

      self.popup.open = function(selectPeriod) {
        self.info.isPeriodSelector(selectPeriod);
        const activeDate = self.parentData.activeDate;
        $('calendar-popup' + (activeDate ? '#' + activeDate : ''))[0].toggle();
        self.popup.isOpen(true);
      };

      self.popup.close = function() {
        oj.Logger.info('toggle popup');
        const activeDate = self.parentData.activeDate;
        if (self.popup.isOpen()) {
          $('calendar-popup' + (activeDate ? '#' + activeDate : ''))[0].toggle();
        }
        self.popup.isOpen(false);
      };

    }

    return CalendarViewModel;
  }
);