import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Availability } from './model';

const DEFAULT_DATE_TIME_FORMAT = 'ddd MMM DD YYYY THH:mm';

@Injectable()
export class TimeService {

  constructor() { }

  isValid(availabilities: Availability[]): boolean {
    return this.compareEach(availabilities);
  }

  private compareEach(availabilities: Availability[]): boolean {

    if (availabilities.length === 0) { return true; }

    // take the first item and compare to the rest of the array,
    // if a match is found, return false i.e. for overlaps, otherwise
    // remove the first index, and move on until we've reduced to none,
    // then return true if we get that far.
    let availability = availabilities.pop();
    let elements = availabilities
      .filter(a => a.dayOfWeek === availability.dayOfWeek)
      .filter(a => {
        let date = new Date().toDateString();
        let currentStart = moment(`${date} ${a.fromTime}`, DEFAULT_DATE_TIME_FORMAT);
        let currentEnd = moment(`${date} ${a.toTime}`, DEFAULT_DATE_TIME_FORMAT);
        let poppedStart = moment(`${date} ${availability.fromTime}`, DEFAULT_DATE_TIME_FORMAT);
        let poppedEnd = moment(`${date} ${availability.toTime}`, DEFAULT_DATE_TIME_FORMAT);

        if (poppedStart.isSame(currentStart)) { return true; }
        else if(poppedStart.isSame(currentEnd)) { return true; }
        else if (poppedEnd.isSame(currentEnd)) { return true; }
        else if(poppedEnd.isSame(currentStart)) { return true; }
        else if(currentEnd.isSame(poppedStart)) { return true; }
        else if(currentStart.isSame(poppedEnd)) { return true; }
        else if(currentEnd.isSame(poppedEnd)) { return true; }
        else if (poppedStart.isBetween(currentStart, currentEnd)) { return true; }
        else if (poppedEnd.isBetween(currentStart, currentEnd)) { return true; }
        else if(currentStart.isBetween(poppedStart, poppedEnd)) { return true; }
        else if(currentEnd.isBetween(poppedStart, poppedEnd)) { return true; }
        else { return false; }
      });

    return (elements.length > 0) ? false : this.compareEach(availabilities);
  }

}
