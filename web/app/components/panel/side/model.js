define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojcheckboxset', 'calendar/loader'],
  function(oj, ko, $) {

    function TopPanelViewModel(context) {
      var self = this;

      var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
      self.lgScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);

      context.props.then(function(properties) {
        self.parentData = properties.data;

        self.calendarFirstParams = {
          date: self.parentData.date,
          isLocalizationLoaded: self.parentData.isLocalizationLoaded,
          tabs: {
            month: {
              visible: true,
              label: 'от'
            }
          },
          activeDate: 'first'
        };

        self.calendarSecondParams = {
          date: self.parentData.date,
          isLocalizationLoaded: self.parentData.isLocalizationLoaded,
          tabs: {
            month: {
              visible: true,
              label: 'до'
            }
          },
          activeDate: 'second'
        };

        self.checkboxes = ko.pureComputed(function() {
          var result = [];
          for (var i = 0; i < self.parentData.checkboxes.list.length; i+=3) {
            var row = [];
            for (var j = 0; j < 3; j++) {
              row.push(self.parentData.checkboxes.list[i + j]);
            }
            result.push(row);
          }
          return result;
        });

        oj.Logger.log('side panel, chackboxes', self.checkboxes());

        self.apply = function() {
          properties.apply();
          if (!self.lgScreen) {
            self.toggle();
          }
        }

      });

      self.drawerParams = {
        edge: 'start',
        displayMode: 'push',
        selector: '#parameterDrawer',
        content: '#pageContent',
        query: lgQuery
      };

      oj.OffcanvasUtils.setupResponsive(self.drawerParams);

      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      };

      self.toggle = function() {
        return self.toggleDrawer();
      }

    }

    return TopPanelViewModel;
  }
);