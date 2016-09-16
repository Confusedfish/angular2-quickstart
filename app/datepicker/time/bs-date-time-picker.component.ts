import { Component,EventEmitter } from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { DatePickerState } from '../common/bs-date-picker-state.provider';
import { DatePickerOptions } from '../common/bs-date-picker-options.provider';

import * as moment from 'moment';
import { OnChange } from '../../utils/decorators';

@Component({
  selector: 'bs-datetimepicker',
  exportAs: 'bs-datetimepicker',
  moduleId: module.id,
  templateUrl: './bs-date-time-picker.html'
})
export class DateTimePickerComponent extends DatePickerBase {
  @OnChange() public date:moment.Moment;
  public dateChange:EventEmitter<moment.Moment> = new EventEmitter(true);

  public hours:string;
  public minutes:string;
  public ampm:string;
  public showAmPm: boolean = true;
  public minutesInc: number = 10;
  public hoursInc: number = 1;

  public constructor(datePickerService:DatePickerState, options:DatePickerOptions) {
    super(datePickerService, options);
    this.dateChange.subscribe((date:moment.Moment)=> {
      if (!this.datePickerState.viewDate.isSame(date)) {
        this.datePickerState.viewDate = date;
        this.refresh();
      }
    });
  }

  public refresh():void {
    if (!this.datePickerState.viewDate || !this.dateChange) {
      return;
    }
    this.date = this.datePickerState.viewDate;

    let mins = this.date.minutes();
    let roundMins = mins - (mins % this.options.timepicker.minutesInc);
    this.date.minutes(roundMins);
    this.minutes = this.date.format('mm');
    this.hours = this.options.timepicker.showAmPm ?
      this.date.format('hh') : this.date.format('HH');
    this.ampm = this.date.format('a');
    this.showAmPm = this.options.timepicker.showAmPm;
    this.minutesInc = this.options.timepicker.minutesInc;
    this.hoursInc = this.options.timepicker.hoursInc;
  }

  public add(granularity:string):void {
    if (granularity === 'minutes') {
      this.date = this.date.clone().add(this.options.timepicker.minutesInc, granularity as moment.UnitOfTime);
      return;
    }
    if (granularity === 'hours') {
      this.date = this.date.clone().add(this.options.timepicker.hoursInc, granularity as moment.UnitOfTime);
    }
  }

  public subtract(granularity:string):void {
    if (granularity === 'minutes') {
      this.date = this.date.clone().subtract(this.options.timepicker.minutesInc, granularity as moment.UnitOfTime);
      return;
    }
    if (granularity === 'hours') {
      this.date = this.date.clone().subtract(this.options.timepicker.hoursInc, granularity as moment.UnitOfTime);
    }
  }

  //Called by the UI when the user manually edits the hours / minutes number
  private updateMinutes(event: Event) {
      let newMinutes = Number(this.minutes)
      if (this.date.get('minutes') == newMinutes)
          return;

      this.date.set('minutes',newMinutes);
      //Raise the change event on the date
      this.date = this.date.clone();
  }
  private updateHours(event: Event) {
      let newHours = Number(this.hours)
      if (this.date.get('hours') == newHours)
          return;

      this.date.set('hours', newHours);
      //Raise the change event on the date
      this.date = this.date.clone();
  }

  public setTime(date:moment.Moment):moment.Moment {
    return date;
  }

  public toggleMeridiem():void {
    if (moment.localeData().isPM(this.date.format('a'))) {
      this.date = this.date.clone().add(12, 'hours');
      return;
    }
    this.date = this.date.clone().subtract(12, 'hours');
  }
}
