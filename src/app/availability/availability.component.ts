import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { validate } from 'class-validator';

import { Availability, Days } from '../model';
import { Time } from '../time/time.component';

import * as moment from 'moment';

@Component({
  selector: 'availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {

  @Output() availabilityOutput = new EventEmitter();
  days: string[] = [];
  availability: Availability;
  keyIndex: number = 0;
  incorrectTimes: boolean = false;
  incorrectFormat: boolean = false;
  start: string;
  finish: string;

  constructor() { }

  ngOnInit() {
    this.days.push(Days.monday, Days.tuesday, Days.wednesday, Days.thursday, Days.friday, Days.saturday, Days.sunday);
    this.availability = new Availability();
  }

  add(): void {
    this.availability.fromTime = this.start;
    this.availability.toTime = this.finish;
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
          this.alertDismissed();
        } else {
          this.incorrectTimes = true;
        }
      }
    });
  }

  updateTime(time: Time) {
    this.start = time.start;
    this.finish = time.finish;
  }

  alertDismissed() {
    this.incorrectTimes = false;
    this.incorrectFormat = false;
  }
}
