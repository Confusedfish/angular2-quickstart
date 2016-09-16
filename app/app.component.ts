import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
moment.locale('en');

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public opts:any = {
    mode: 'daterange',
    viewMode: 'days',
    ui: {
      minMode: 'days',
      maxMode: 'years',
      showWeekNumbers: 1,
      showISOWeekNumbers: 0,
      showCurrentDate: 1,
      alwaysShowCalendars: 1,
      showCustomRangeLabel: true,
      showCustomRanges: true,
      monthColumns: 3,
      monthRows: 4,
      yearColumns: 5,
      yearRows: 4,
      dayColumns: 7,
      dayRows: 6,
      singleDatePicker: false,
      showTimePicker: true
    },
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    customDates: [{
      date: moment().subtract(15, 'days'),
      isDisabled: false
    }],
    date: {
      // min : moment().subtract(5, 'days')
    },
    locale: 'en-GB',
    timepicker: {
        showAmPm : true
    }
  };

  public refresh(): void {
      moment.locale(this.opts.locale);
      this.opts = Object.assign({}, this.opts);
  }

  public ngOnInit():void {
  }
}
