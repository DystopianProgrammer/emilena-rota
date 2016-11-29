import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unspecified'
})
export class UnspecifiedPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (!value) ? 'N/A' : value;
  }

}
