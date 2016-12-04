import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class Time {
  start: string;
  finish: string;
}

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  @Input() inputStart;
  @Input() inputEnd;
  @Output() outputTime: EventEmitter<any> = new EventEmitter();

  fromHours: string;
  fromMinutes: string;
  untilHours: string;
  untilMinutes: string;
  incorrectTimes: boolean = false;

  constructor() { }

  ngOnInit() { 
    if(this.inputStart && this.inputEnd) {
      this.fromHours = this.inputStart.split(':')[0];
      this.fromMinutes = this.inputStart.split(':')[1];
      this.untilHours = this.inputEnd.split(':')[0];
      this.untilMinutes = this.inputEnd.split(':')[1];
    }
  }

  fromHrs(event) {
    this.fromHours = this.append(event, this.fromHours);
  }

  frmMins(event) {
    this.fromMinutes = this.append(event, this.fromMinutes);
  }

  tilHrs(event) {
    this.untilHours = this.append(event, this.untilHours);
  }

  tilMins(event) {
    this.untilMinutes = this.append(event, this.untilMinutes);
  }

  private append(value: any, model: string): string {
    let output;
    if (/^\d+$/.test(model)) {
      if (model.length <= 2) {
        output = model;
      }
    } else {
      model = '';
    }

    if (this.fromHours && this.fromMinutes && this.untilHours && this.untilMinutes) {
      if (this.fromHours.length == 2 && this.fromMinutes.length == 2
        && this.untilHours.length == 2 && this.untilMinutes.length == 2) {

        let time = new Time();
        time.start = `${this.fromHours}:${this.fromMinutes}`;
        time.finish = `${this.untilHours}:${this.untilMinutes}`;
        this.outputTime.emit(time);
      }
    }
    return output;
  }
}
