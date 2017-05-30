
define(['ojs/ojcore', 'knockout', 'jquery', 'moment', 'css2pdf'],
  function(oj, ko, $, moment) {

    function CTMViewModel(params) {

      var self = this;

      self.rootData = params;

      self.reportTitle = ko.observable(oj.Translations.getTranslatedString('reportSegmentTitle'));

      self.rootData.isLocalizationLoaded.subscribe(function(value) {
        self.reportTitle(oj.Translations.getTranslatedString('reportSegmentTitle'));
      });

      self.topDrawerParams = {
        displayMode: 'overlay',
        selector: '#topPanel',
        content: '#report-container'
      };

      self.togglePanel = function() {
        self.toggleDrawer();
        var view = $('#pagePanel');
        var topPanelHeight = $('#topPanel').height();
        if ((view.height() - topPanelHeight) < 20) {
          view.height(topPanelHeight + 20);
        }
      };

      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.topDrawerParams);
      };

      self.exportToPDF = function() {
        var width = window.innerWidth, height = window.innerHeight;
        return xepOnline.Formatter.Format('content-area', {pageWidth: width + 'px', pageHeight: height + 'px', filename: 'ctm', render: 'download'});
      };

      function formatForDisplay(firstDate, secondDate, isComparative) {
        var date1 = moment(firstDate), date2 = moment(secondDate);
        if (isComparative) {
          date1 = date1.subtract(364, 'days');
          date2 = date2.subtract(364, 'days');
        }
        if (firstDate === secondDate) {
          return date1.format('DD.MM.YYYY');
        }
        else {
          return "from " + date1.format('DD.MM.YYYY') + " to " + date2.format('DD.MM.YYYY');
        }
      }

      self.handleActivated = function(info) {
        // Implement if needed;
        console.log(self.rootData);
        return self.rootData.promise;
      };

      self.handleAttached = function(info) {

        function prepareTopPanelParams() {

          var nomenclature = self.rootData.nomenclature;

          var filters = [
            [
              {
                name: 'Format',
                data: [
                  {code: 'total', name: 'TOTAL'},
                  {code: 'hyper', name: 'HYPER'},
                  {code: 'city', name: 'CITY'},
                  {code: 'raduga', name: 'RADUGA'}
                ]
              },
              {
                name: 'Grappa',
                data: [
                  {code: 'total', name: 'TOTAL'},
                  {code: '00moscow', name: '00 Moscow'},
                  {code: '01spb', name: '01 St. Petersburg'}
                ]
              },
              {
                name: 'Store',
                data: [
                  {code: 'total', name: 'TOTAL'},
                  {code: '001mytishi', name: '001 MYTISHI'},
                  {code: '002kommunarka', name: '002 KOMMUNARKA'}
                ]
              }
            ],
            [
              {
                name: 'market',
                data: nomenclature.markets,
                optionChange: nomenclature.marketOptionChange
              },
              {
                name: 'segment',
                data: nomenclature.segments,
                disabled: ko.pureComputed(function() {
                  return nomenclature.market().code === 'TOTAL';
                }),
                optionChange: nomenclature.segmentOptionChange
              },
              {
                name: 'category',
                data: nomenclature.categories,
                disabled: ko.pureComputed(function() {
                  return nomenclature.segment().code === 'TOTAL';
                }),
                optionChange: nomenclature.categoryOptionChange
              },
              {
                name: 'family',
                data: self.rootData.nomenclature.families,
                disabled: ko.pureComputed(function() {
                  return self.rootData.nomenclature.category().code === 'TOTAL';
                }),
                optionChange: self.rootData.nomenclature.familyOptionChange
              }
            ]
          ];

          var checkboxes = [
            {id: 'ac', label: 'AC'},
            {id: 'as', label: 'AS'},
            {id: 'nc', label: 'NC'},
            {id: 'nv', label: 'NV'},
            {id: 'ps', label: 'PS'},
            {id: 'an', label: 'AN'},
            {id: 'nn', label: 'NN'},
            {id: 'pa', label: 'PA'},
            {id: 'se', label: 'SE'}
          ];

          self.topPanelModuleParams = {
            date: self.rootData.date,
            isLocalizationLoaded: self.rootData.isLocalizationLoaded,
            toggleDrawer: self.toggleDrawer,
            filters: filters,
            checkboxes: checkboxes
          };

        }

        function createCharts() {

          function adjustForPDF(id) {
            var svg = $('#' + id).find('svg');
            svg.attr("xmlns", "http://www.w3.org/2000/svg");
            svg.css('overflow','visible');
          };

          var chartOptions = {
            is3D: true,
            legend: {
              position: 'bottom'
            },
            pieSliceText: 'percentage',
            slices: {
              1: {offset: 0.3},
              2: {offset: 0.3},
              3: {offset: 0.3}
            },
            tooltip: {
              trigger: 'none'
            },
            height: 300,
            titleTextStyle: {
              fontSize: 20
            }
          };

          function createPieChart() {

            var id = 'pie-chart';

            var data = google.visualization.arrayToDataTable([
              ['Type', 'Percents'],
              ['KD', 78.8],
              ['MDD', 15],
              ['MDDI', 5.4],
              ['Other', 0.8]
            ]);

            var options = $.extend(chartOptions, {title: 'Кол-во референций'});

            var chart = new google.visualization.PieChart(document.getElementById(id));

            chart.draw(data, options);

            adjustForPDF(id);

          }

          createPieChart();

          function createPieChart2() {

            var id = 'pie-chart-2';

            var data = google.visualization.arrayToDataTable([
              ['Type', 'Percents'],
              ['KD', 78.8],
              ['MDD', 15],
              ['MDDI', 5.4],
              ['Other', 0.8]
            ]);

            var options = $.extend(chartOptions, {title: 'Кол-во прод. Арт'});

            var chart = new google.visualization.PieChart(document.getElementById(id));

            chart.draw(data, options);

            adjustForPDF(id);

          }

          createPieChart2();

          function createPieChart3() {

            var id = 'pie-chart-3';

            var data = google.visualization.arrayToDataTable([
              ['Type', 'Percents'],
              ['KD', 78.8],
              ['MDD', 15],
              ['MDDI', 5.4],
              ['Other', 0.8]
            ]);

            var options = $.extend(chartOptions, {title: 'Товарооборот'});

            var chart = new google.visualization.PieChart(document.getElementById(id));

            chart.draw(data, options);

            adjustForPDF(id);

          }

          createPieChart3();

        }

        self.displayDate = ko.computed(function() {
          return formatForDisplay(this.date.first(), this.date.second(), false);
        }, self.rootData);

        self.displayDateComparative = ko.computed(function() {
          return formatForDisplay(this.date.first(), this.date.second(), true);
        }, self.rootData);

        prepareTopPanelParams();

        self.topPanelToggleSubscription = self.rootData.isTopPanelToggled.subscribe(function() {
          self.toggleDrawer();
        });

        createCharts();

      };

      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      self.handleDetached = function(info) {
        self.topPanelToggleSubscription.dispose();
      };

    }

    return CTMViewModel;
  }
);
