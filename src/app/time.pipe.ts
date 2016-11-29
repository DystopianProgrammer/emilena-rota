import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let values = value.split(':');
    if(values.length < 1) return value;
    return `${values[0]}:${values[1]}`;
  }
}
