import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { validate } from 'class-validator';

import { DayOfWeek, Availability } from '../model';

import * as moment from 'moment';

@Component({
  selector: 'availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css']
})
export class AvailabilityComponent implements OnInit {

  @Output() availabilityOutput = new EventEmitter();
  days: string[] = [];
  availability: Availability;
  keyIndex: number = 0;
  incorrectTimes: boolean = false;
  incorrectFormat: boolean = false;

  constructor() { }

  ngOnInit() {
    for (let day in DayOfWeek) {
      if (typeof DayOfWeek[day] === 'number') { this.days.push(day); }
    }
    this.availability = new Availability();
  }

  add(): void {
    validate(this.availability).then(errors => {
      if (errors.length > 0) {
        this.availabilityOutput.emit(errors);
        this.incorrectFormat = true;
      } else {
        let start = moment(this.availability.fromTime, 'hh:mm');
        let finish = moment(this.availability.toTime, 'hh:mm');
        if (!finish.isBefore(start)) {
          this.availabilityOutput.emit(this.availability);
          this.availability = new Availability();
        } else {
          this.incorrectTimes = true;
        }
      }
    });
  }

  alertDismissed() {
    this.incorrectTimes = false;
    this.incorrectFormat = false;
  }

  onKey(event: any) {
    if (event.target.value.length == 2 && !isNaN(event.key)) {
      event.target.value += ':';
    }
  }
}
