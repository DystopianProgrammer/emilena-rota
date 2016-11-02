import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { validate } from 'class-validator';

import { DayOfWeek, Availability } from '../model';

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
      } else {
        this.availabilityOutput.emit(this.availability);
        this.availability = new Availability();
      }
    });
  }

  onKey(event: any) {
    console.log(event);
    if(event.target.value.length == 2 && !isNaN(event.key)) {
      event.target.value += ':';
    }
  }
}
