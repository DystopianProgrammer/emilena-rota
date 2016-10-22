import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return (value && value.length > 1) ? value.charAt(0).toUpperCase().concat(value.substr(1, value.length).toLowerCase()) : value;
  }

}
