/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TimeService } from './time.service';
import { Availability } from './model';

describe('Service: Time', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeService]
    });
  });

  it('should return false for identicial times', inject([TimeService], (service: TimeService) => {

    let a1 = new Availability();
    a1.dayOfWeek = 'MONDAY';
    a1.fromTime = '10:00';
    a1.toTime = '12:00';

    let a2 = new Availability();
    a2.dayOfWeek = 'MONDAY';
    a2.fromTime = '10:00';
    a2.toTime = '12:00';

    let availabilities: Availability[] = [a1, a2];

    let result = service.isValid(availabilities);

    expect(result).toEqual(false);
  }));

  it('should return false for overlapping times', inject([TimeService], (service: TimeService) => {

    let a1 = new Availability();
    a1.dayOfWeek = 'MONDAY';
    a1.fromTime = '10:00';
    a1.toTime = '12:00';

    let a2 = new Availability();
    a2.dayOfWeek = 'MONDAY';
    a2.fromTime = '11:00';
    a2.toTime = '13:00';

    let availabilities: Availability[] = [a1, a2];

    let result = service.isValid(availabilities);

    expect(result).toEqual(false);
  }));

  it('should return false for joining times', inject([TimeService], (service: TimeService) => {

    let a1 = new Availability();
    a1.dayOfWeek = 'MONDAY';
    a1.fromTime = '13:00';
    a1.toTime = '14:00';

    let a2 = new Availability();
    a2.dayOfWeek = 'MONDAY';
    a2.fromTime = '11:00';
    a2.toTime = '13:00';

    let availabilities: Availability[] = [a1, a2];

    let result = service.isValid(availabilities);

    expect(result).toEqual(false);
  }));

  it('should return true for different days', inject([TimeService], (service: TimeService) => {

    let a1 = new Availability();
    a1.dayOfWeek = 'MONDAY';
    a1.fromTime = '10:00';
    a1.toTime = '12:00';

    let a2 = new Availability();
    a2.dayOfWeek = 'TUESDAY';
    a2.fromTime = '11:00';
    a2.toTime = '13:00';

    let availabilities: Availability[] = [a1, a2];

    let result = service.isValid(availabilities);

    expect(result).toEqual(true);
  }));

  it('should return true for different times same day', inject([TimeService], (service: TimeService) => {

    let a1 = new Availability();
    a1.dayOfWeek = 'MONDAY';
    a1.fromTime = '10:00';
    a1.toTime = '11:00';

    let a2 = new Availability();
    a2.dayOfWeek = 'MONDAY';
    a2.fromTime = '12:00';
    a2.toTime = '13:00';

    let availabilities: Availability[] = [a1, a2];

    let result = service.isValid(availabilities);

    expect(result).toEqual(true);
  }));

});
