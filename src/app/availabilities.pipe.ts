import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './model';

@Pipe({
  name: 'availabilities'
})
export class AvailabilitiesPipe implements PipeTransform {

  transform(person: Person, args?: any): any {
    let availability = person.availabilities.map(a => {
      return `${a.dayOfWeek} From: ${a.fromTime}, Until: ${a.toTime}`;
    });
    return (availability) ? availability : '';
  }

}
