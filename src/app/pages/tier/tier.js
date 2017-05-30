define(['ojs/ojcore', 'knockout', 'jquery', 'moment', 'devextreme', 'css2pdf', 'sidePanel/loader'],
  function (oj, ko, $, moment) {

    function TierViewModel(params) {

      var self = this;
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

      self.sidePanelParams = {
        isLocalizationLoaded: params.isLocalizationLoaded
      };
      self.drinkRadios = [
        {id: 'Qos', label: 'Qos'},
        {id: 'In Time',    label: 'In Time'},
        {id: 'Losses',   label: 'Losses'},
        {id: 'Payment Delay', label: 'Payment Delay'},
        {id: 'Out of stock',    label: 'Out of stock'}
      ];

      self.handleActivated = function (info) {
        // Implement if needed;
      };

      self.handleAttached = function (info) {

        self.sideDrawerParams = {
          edge: 'start',
          displayMode: 'overlay',
          selector: '#reportsSidePanel',
          content: '#reportContainer',
          query: mdQuery
        };

        oj.OffcanvasUtils.setupResponsive(self.sideDrawerParams);

        self.browsers = ko.observableArray([
          {value: 'Internet Explorer', label: 'Internet Explorer'},
          {value: 'Firefox',  label: 'Firefox'},
          {value: 'Chrome',   label: 'Chrome'},
          {value: 'Opera',    label: 'Opera'},
          {value: 'Safari',   label: 'Safari'}
        ]);


        function ChartModel() {

          // Attribute Groups Handler for Consistent Coloring
          var attrGroups = new oj.ColorAttributeGroupHandler();
          // Categories
          var categories = ["Meeting", "Proposal"];
          var hiddenCategories = [categories[0]];
          this.hiddenCategoriesValue = ko.observableArray(hiddenCategories);
          var timeSeries = [{
            name: categories[0],
            items: [{y: 70, label: 70, color: '#D3DAE0'}, {y: 60, label: 60, color: '#D3DAE0'},
              {y: 70, label: 70, color: '#D3DAE0'}, {y: 90, label: 90, color: '#D3DAE0'}, {
                y: 60,
                label: 60,
                color: '#D3DAE0'
              },
              {y: 50, label: 50, color: '#D3DAE0'}, {y: 70, label: 70, color: '#D3DAE0'}, {
                y: 50,
                label: 50,
                color: '#ED9BA1'
              },
              {y: 30, label: 30, color: '#D3DAE0'}, {y: 80, label: 80, color: '#D3DAE0'}]
          },
            {
              name: categories[1],
              items: [{y: 50, label: 50, color: '#ACBBC2'}, {y: 30, label: 30, color: '#ACBBC2'},
                {y: 40, label: 40, color: '#ACBBC2'}, {y: 50, label: 50, color: '#ACBBC2'}, {
                  y: 40,
                  label: 40,
                  color: '#ACBBC2'
                },
                {y: 70, label: 70, color: '#ACBBC2'}, {y: 60, label: 60, color: '#ACBBC2'}, {
                  y: 40,
                  label: 40,
                  color: '#EE1D23'
                },
                {y: 20, label: 20, color: '#ACBBC2'}, {y: 70, label: 70, color: '#ACBBC2'}]
            }];
          var timeGroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          var converterFactory = oj.Validation.converterFactory('number');
          var currencyConverter = converterFactory.createConverter({style: 'currency', currency: '%'});
          this.numberConverter = ko.observable(currencyConverter);
          this.timeSeriesValue = ko.observableArray(timeSeries);
          this.timeGroupsValue = ko.observableArray(timeGroups);
          //self.yAxisConverter = ko.observable(percentConverter);
          // Legend Data
          var legendSections = [{items: []}];
          var legendItems = legendSections[0].items;
          for (var categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
            var category = categories[categoryIndex];
            legendItems.push({
              text: category,
              color: attrGroups.getValue(category),
              shortDesc: "Filter: " + category
            });
          }
          this.legendSections = ko.observableArray(legendSections);
        }
        function ChartModel2() {
          this.orientationValue = ko.observable('vertical');
          var lineSeries = [{name : "Series 1", items : [74, 62, 70, 76, 66] , color: '#BBBECD'},
            {name : "Series 2", items : [50, 38, 46, 54, 42], color: '#BBBECD'},
            {name : "Series 3", items : [34, 22, 30, 32, 26], color: '#ED1B24'},
            {name : "Series 4", items : [18,  6, 14, 22, 10], color: '#BBBECD'},
            {name : "Series 5", items : [3,  2,  3,  3,  2], color: '#BBBECD'}];
          var lineGroups = ["Group A", "Group B", "Group C", "Group D", "Group E"];
          this.lineSeriesValue = ko.observableArray(lineSeries);
          this.lineGroupsValue = ko.observableArray(lineGroups);
        }
        function ChartModel3() {
          this.orientationValue = ko.observable('vertical');
          var lineSeries = [{name : "Series 1", items : [74, 62, 70, 76, 66], color: '#BBBECD'},
            {name : "Series 2", items : [50, 38, 46, 54, 42], color: '#BBBECD'},
            {name : "Series 3", items : [34, 22, 30, 32, 26], color: '#ED1B24'},
            {name : "Series 4", items : [18,  6, 14, 22, 10], color: '#BBBECD'},
            {name : "Series 5", items : [3,  2,  3,  3,  2], color: '#BBBECD'}];
          var lineGroups = ["Group A", "Group B", "Group C", "Group D", "Group E"];
          this.lineSeriesValue = ko.observableArray(lineSeries);
          this.lineGroupsValue = ko.observableArray(lineGroups);
        }
        function ChartModel4() {
          var pieSeries = [{name: "", items: [10], color: '#D3DAE0', textSize: 5},
            {name: "", items: [10], color: '#D3DAE0'},
            {name: "", items: [10], color: '#D3DAE0'},
            {name: "", items: [10], color: '#D3DAE0'},
            {name: "", items: [10], color: '#D3DAE0'},
            {name: "", items: [10], color: '#D3DAE0'},
            {name: "", items: [10], color: '#D3DAE0'},
            {name: "", items: [10], color: '#D3DAE0'},
            {name: "", items: [10], color: '#ED1B24'},
            {name: "", items: [10], color: '#D3DAE0'}];
          this.pieSeriesValue = ko.observableArray(pieSeries);
          var converterFactory = oj.Validation.converterFactory('number');
          var converter = converterFactory.createConverter({pattern: "#.#%"});
          this.pieSliceLabel = function (dataContext) {
            var percent = dataContext.value / dataContext.totalValue;
            return dataContext.value + "M Units (" + converter.format(percent) + ")";
          }
        }
        function ChartModel5() {
          // Attribute Groups Handler for Consistent Coloring
          var attrGroups = new oj.ColorAttributeGroupHandler();
          // Categories
          var categories = ["Meeting"];
          var hiddenCategories = [categories[0]];
          this.hiddenCategoriesValue = ko.observableArray(hiddenCategories);
          var timeSeries = [{name: categories[0], items: [{y:70, color:'#ACBBC2'}, {y:60, color:'#ACBBC2'},
            {y:70, color:'#ACBBC2'}, {y:90, color:'#EE1D23'}, {y:60, color:'#ACBBC2'}, {y:50, color:'#ACBBC2'},
            {y:70, color:'#ACBBC2'}, {y:50, color:'#ACBBC2'}, {y:30, color:'#ACBBC2'}, {y:80, color:'#ACBBC2'}]}];
          var timeGroups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
          var converterFactory = oj.Validation.converterFactory('number');
          var currencyConverter = converterFactory.createConverter({style: 'currency', currency: '%'});
          this.timeSeriesValue = ko.observableArray(timeSeries);
          this.timeGroupsValue = ko.observableArray(timeGroups);
          this.yAxisConverter = ko.observable(currencyConverter);
          // Legend Data
          var legendSections = [{items : []}];
          var legendItems = legendSections[0].items;
          for(var categoryIndex = 0; categoryIndex < categories.length; categoryIndex++) {
            var category = categories[categoryIndex];
            legendItems.push({text : category,  color : attrGroups.getValue(category), shortDesc: "Filter: " + category});
          }
          this.legendSections = ko.observableArray(legendSections);
        }
        var deptArray = [{Name: '%Sales in Category', value:'67.98%'},
          {Name: '%Sales vs last year', value:'100%'},
          {Name: '%Sales promo', value:'87%'},
          {Name: '%Sales promo vs last year', value:'2.87%'}];
        self.datasource = new oj.ArrayTableDataSource(deptArray, {idAttribute: 'Name'});


        var chartModel = new ChartModel();
        var chartModel2 = new ChartModel2();
        var chartModel3 = new ChartModel3();
        var chartModel4 = new ChartModel4();
        var chartModel5 = new ChartModel5();
        var displayNone = function () {
          $('#hybrid-2').css({display: 'none'});
          $('#hybrid-3').css({display: 'none'});
        };
        self.creatAllCharts = function () {
          ko.applyBindings(chartModel, document.getElementById('chart-container'));
          ko.applyBindings(chartModel2, document.getElementById('chart-container2'));
          ko.applyBindings(chartModel3, document.getElementById('chart-container3'));
          ko.applyBindings(chartModel4, document.getElementById('chart-container4'));
          ko.applyBindings(chartModel5, document.getElementById('chart-container5'));

          $('.toggler').click(function () {
            $('.toggler').removeClass('toggler-active');
            var toggler = $(this);
            toggler.addClass('toggler-active');
            if ($('#tog1').hasClass('toggler-active')) {
              $('#hybrid-1').css({display: 'block'});
              $('#hybrid-2').css({display: 'none'});
              $('#hybrid-3').css({display: 'none'});
            }
            if ($('#tog2').hasClass('toggler-active')) {
              $('#hybrid-1').css({display: 'none'});
              $('#hybrid-2').css({display: 'block'});
              $('#hybrid-3').css({display: 'none'});
            }
            if ($('#tog3').hasClass('toggler-active')) {
              $('#hybrid-1').css({display: 'none'});
              $('#hybrid-2').css({display: 'none'});
              $('#hybrid-3').css({display: 'block'});
            }
          });

          $('.flex-block').click(function () {
            $('.flex-block').removeClass('flex-active');
            var eve = $(this);
            eve.addClass('flex-active');
            // $('.chart-container-single').removeClass('active');
          })

        };
        self.creatAllCharts();
        setTimeout(displayNone, 500);
      }
      self.handleBindingsApplied = function (info) {
        // Implement if needed
      };

      self.handleDetached = function (info) {
        //self.topPanelToggleSubscription.dispose();
      };
    }

    return TierViewModel;
  }
);