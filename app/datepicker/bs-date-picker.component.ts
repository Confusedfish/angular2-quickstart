import { Component, Input, EventEmitter } from '@angular/core';
import { DatePickerOptions } from './common/bs-date-picker-options.provider';
import { OnChange } from '../utils/decorators';
import { DatePickerState } from './common/bs-date-picker-state.provider';

@Component({
  selector: 'bs-datepicker',
  exportAs: 'bs-datepicker',
  templateUrl: './bs-date-picker.html',
  moduleId: module.id
})
export class DatePickerComponent {
// here will be parsed options and set defaults
  @Input() @OnChange() public options:DatePickerOptions;
  public optionsChange: EventEmitter<DatePickerOptions> = new EventEmitter();
  public singleDatePicker: boolean;

  public constructor(private datePickerOptions: DatePickerOptions, datePickerState: DatePickerState) {
    this.optionsChange.subscribe((v:any)=> {
        datePickerOptions.update(v);
        this.singleDatePicker = datePickerOptions.ui.singleDatePicker;
      });
    this.singleDatePicker = datePickerOptions.ui.singleDatePicker;
  }

  public apply(){

  }
}
