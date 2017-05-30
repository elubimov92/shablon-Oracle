define(['ojs/ojcore', 'knockout', 'jquery', 'moment'],
  function(oj, ko, $, moment) {

    function CalendarTabContentViewModel(context) {
      var self = this;

      context.props.then(function(properties) {
        self.calendar = properties.data;

        self.state = {};

        self.state.firstDate = ko.pureComputed(function() {
          return moment(self.calendar.firstDate()).date();
        });

        self.state.secondDate = ko.pureComputed(function() {
          return moment(self.calendar.secondDate()).date();
        });

        self.state.firstMonth = ko.pureComputed(function() {
          return self.calendar.formatDate(self.calendar.firstDate, 'MMM');
        });

        self.state.secondMonth = ko.pureComputed(function() {
          return self.calendar.formatDate(self.calendar.secondDate, 'MMM');
        });

        self.state.fullFirstMonth = ko.pureComputed(function() {
          return self.calendar.formatDate(self.calendar.firstDate, 'MMMM');
        });

        self.state.fullSecondMonth = ko.pureComputed(function() {
          return self.calendar.formatDate(self.calendar.secondDate, 'MMMM');
        });

        self.state.firstYear = ko.pureComputed(function() {
          return self.calendar.formatDate(self.calendar.firstDate, 'YYYY');
        });

        self.state.secondYear = ko.pureComputed(function() {
          return self.calendar.formatDate(self.calendar.secondDate, 'YYYY');
        });

        self.monthLabel = ko.pureComputed(function() {
          var month, year;
          if (self.calendar.info.singleDate() === 'second') {
            month = self.state.fullSecondMonth;
            year = self.state.secondYear;
          }
          else {
            month = self.state.fullFirstMonth;
            year = self.state.firstYear;
          }
          return month() + ' ' + year();
        });

      });

      self.isDayOrWeekCalendar = function() {
        var type = self.calendar.info.type();
        return type === 'day' || type === 'week';
      };

      self.togglePopup = function(selectPeriod) {
        oj.Logger.info('toggle popup');
        var popup = self.calendar.popup;
        if (popup.isOpen()) {
          popup.close();
        }
        else {
          popup.open(selectPeriod);
        }
      };

    }

    return CalendarTabContentViewModel;
  }
);