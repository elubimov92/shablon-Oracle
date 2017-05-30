define(['ojs/ojcore', 'knockout', 'jquery', 'moment'],
  function(oj, ko, $, moment) {

    function CalendarTabContentViewModel(context) {
      var self = this;

      // Contains logic of selected dates of the calendar
      self.selection = {};

      context.props.then(function(properties) {
        self.calendar = properties.data;

        self.calendarId = self.calendar.id;

        self.popupId = ko.pureComputed(function() {
          const singleDate = self.calendar.info.singleDate();
          return 'calendarPopup' + (singleDate ? singleDate.charAt(0).toUpperCase() + singleDate.slice(1) : '');
        });

        // Information about current state of the calendar that can be displayed in the view
        self.state = {};

        self.state.date = ko.observable(moment(self.calendar.firstDate()).startOf(self.calendar.info.type).toDate());

        self.formatDate = self.calendar.formatDate;

        self.state.month = ko.pureComputed(function() {
          return self.formatDate(self.state.date, 'MMMM');
        });

        self.state.year = ko.pureComputed(function() {
          return self.formatDate(self.state.date, 'YYYY');
        });

        self.state.type = self.calendar.info.type;
        self.state.prevType = ko.observable();

        self.state.type.subscribe(function(value) {
          // Write previous value in separate field before type changes
          self.state.prevType(value);
        }, this, "beforeChange");

        self.state.type.subscribe(function(value) {
          // Set previous week by default. Only if day of current week or in the future is selected
          if (value !== 'day' && moment(self.state.date()) >= moment().startOf(value)) {
            subtract(moment.duration(1, value));
          }
          if (value !== 'day' || self.state.prevType !== 'week') {
            setDate(self.state.date(), false);
          }
        });

        self.isDayOrWeekCalendar = function() {
          var type = self.state.type();
          return type === 'day' || type === 'week';
        };

        self.state.isPeriodSelector = self.calendar.info.isPeriodSelector;
        self.state.singleDate = self.calendar.info.singleDate;

        self.popup = self.calendar.popup;

        self.selection.first = self.calendar.firstDate;
        self.selection.second = self.calendar.secondDate;

        self.daysInMonth = ko.pureComputed(function() {
          const current = moment(self.state.date());
          const year = current.year();
          const month = current.month();
          const date = new Date(year, month, 1);
          var calendar_start = moment(date).startOf('month').startOf('week');
          var calendar_end = moment(date).endOf('month').endOf('week');

          var a = calendar_end;
          var b = (a.diff(calendar_start, 'week') < 5) ? calendar_start.subtract(1, 'week') : calendar_start;
          var result = [];
          while (a.diff(b, 'days') > 0) {
            for (var i = 0; i < 7; i++) {
              const active = b.diff(moment(), 'days') < 0 && year === b.year() && month === b.month();

              const selected = (b.diff(self.selection.first(), 'milliseconds') >= 0 &&
              b.diff(self.selection.second(), 'milliseconds') <= 0);
              result.push({
                date: b.toDate(),
                day: b.date(),
                active: active,
                selected: selected
              });
              b.add(1, 'day');
            }
          }
          return result;
        });

        self.monthInYear = ko.pureComputed(function() {
          const current = moment(self.state.date());
          const year = current.year();
          const date = new Date(year, 0, 1);
          var a = moment(date).add(12, 'month');
          var b = moment(date);
          var result = [];

          const activeDate = self.state.singleDate() === 'second' ? self.selection.second() : self.selection.first();

          while (a.diff(b, 'months') > 0) {
            const selected = moment(activeDate).month() === moment(b).month();
            result.push({
              date: b.toDate(),
              selected: selected,
              month: b.format('MMM')
            });
            b.add(1, 'month');
          }
          return result;
        });

        self.yearsInPeriod = ko.pureComputed(function() {
          const year = 2015;
          var a = moment().startOf('year');
          var b = moment([
            year,
            self.state.date().getMonth(),
            self.state.date().getDate()
          ]);
          var result = [];
          while (a.diff(b, 'years') >= 0) {
            const selected = moment(self.selection.first()).year() === b.year();
            result.push({
              date: b.toDate(),
              selected: selected,
              year: b.year()
            });
            b.add(1, 'year');
          }
          return result;
        });

      });function setDate(date, setPeriod) {
        self.state.date(date);
        var singleDate = self.state.singleDate();

        switch (self.state.type()) {
          case 'day': {
            if (setPeriod && self.selection.first() < date) {
              self.selection.second(date);
            }
            else {
              self.selection.first(date);
              self.selection.second(date);
            }
          }
            break;

          case 'week': {
            self.selection.first(moment(date).startOf('week').toDate());
            self.selection.second(moment(date).endOf('week').toDate());
          }
            break;

          case 'month': {
            console.log(date);
            if (setPeriod && self.selection.first() < moment(date).startOf('month').toDate()) {
              self.selection.second(moment(date).endOf('month').toDate());
            }
            else {
              self.selection.first(moment(date).startOf('month').toDate());
              if (!singleDate) {
                self.selection.second(moment(date).startOf('month').toDate());
              }
            }
          }
            break;

          case 'year': {
            self.selection.first(moment(date).startOf('year').toDate());
            self.selection.second(moment(date).endOf('year').toDate());
          }
        }
      };

      self.selection.change = function(item) {
        self.toggle();
        var type = self.state.type();
        if (type === 'day' || type === 'week') {
          var newDate = moment(item.date),
            oldDate = moment(self.state.date());
          if (newDate.month() !== oldDate.month()) {
            if (newDate > oldDate) {
              self.next();
            }
            else {
              self.prev();
            }
          }
        }
        if (isActiveDate(item.date) || type === 'month' || type === 'year') {
          setDate(item.date, self.state.isPeriodSelector());
        }
      };

      function isActiveDate(date) {
        return moment(date).diff(moment(), 'days') < 0;
      };

      self.prev = function () {
        if (self.state.type() === 'month') {
          subtract(moment.duration(1, 'years'));
        }
        else {
          subtract(moment.duration(1, 'months'));
        }
      };

      self.next = function () {
        if (self.state.type() === 'month') {
          // Only switch to next year if it have passed dates
          if (moment(self.state.date()).add(1, 'years').startOf('year') < moment()) {
            add(moment.duration(1, 'years'));
          }
        }
        else {
          // Only switch to next month if it have passed dates
          if (moment(self.state.date()).add(1, 'months').startOf('month') < moment()) {
            add(moment.duration(1, 'months'));
          }
          // Select closest active date
          if (!isActiveDate(self.selection.second())) {
            setDate(moment().subtract(1, 'day').startOf('day').toDate());
          }
        }
      };

      function add(duration) {
        var current = self.state.date, first = self.selection.first, second = self.selection.second;
        if (self.state.type() !== 'week') {
          current(moment(current()).add(duration).toDate());
          if (!self.state.singleDate() || self.state.singleDate() === 'first') {
            first(moment(first()).add(duration).toDate());
          }
          if (!self.state.singleDate() || self.state.singleDate() === 'second') {
            second(moment(second()).add(duration).toDate());
          }
        }
        else {
          current(moment(current()).add(duration).toDate());
          if (!self.state.singleDate() || self.state.singleDate() === 'first') {
            first(moment(current()).startOf('week').toDate());
          }
          if (!self.state.singleDate() || self.state.singleDate() === 'second') {
            second(moment(current()).endOf('week').toDate());
          }
        }
      };

      function subtract(duration) {
        var current = self.state.date, first = self.selection.first, second = self.selection.second;
        if (self.state.type() !== 'week') {
          current(moment(current()).subtract(duration).toDate());
          if (!self.state.singleDate() || self.state.singleDate() === 'first') {
            first(moment(first()).subtract(duration).toDate());
          }
          if (!self.state.singleDate() || self.state.singleDate() === 'second') {
            second(moment(second()).subtract(duration).toDate());
          }
        }
        else {
          current(moment(current()).subtract(duration).toDate());
          if (!self.state.singleDate() || self.state.singleDate() === 'first') {
            first(moment(current()).startOf('week').toDate());
          }
          if (!self.state.singleDate() || self.state.singleDate() === 'second') {
            second(moment(current()).endOf('week').toDate());
          }
        }
      };

      self.selectStyle = function(item, i) {
        var style = '', type = self.state.type();
        if (!item.active && type !== 'month' && type !== 'year') {
          style += 'disabled';
        }
        if (item.selected) {
          style += ' selected';
          return style + (isMultipleSelect() ?
              (isFirstSelected(i()) ? ' selected-first' : (isLastSelected(i()) ? ' selected-last' : ' selected-middle')) : '');
        }
        return style;
      }

      function isFirstSelected(i) {
        return i === 0 || !self.daysInMonth()[i - 1].selected;
      }

      function isLastSelected(i) {
        var days = self.daysInMonth();
        return i === days.length - 1 || !days[i + 1].selected;
      }

      function isMultipleSelect() {
        var isPreviousSelected = false, days = self.daysInMonth();;
        for (i in days) {
          var day = days[i];
          if (isPreviousSelected && day.selected) {
            return true;
          }
          isPreviousSelected = day.selected;
        }
        return false;
      }

      self.toggle = function() {
        const popup = $('#' + self.popupId());
        if (!popup.ojPopup('isOpen')) {
          oj.Logger.log('calendar id is', self.calendar.id());
          popup.ojPopup('open', '#' + self.calendar.id());
        }
        else {
          popup.ojPopup('close');
        }
      }

    }

    return CalendarTabContentViewModel;
  }
);