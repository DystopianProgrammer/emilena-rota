import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(person: any, args?: any): any {
    if (person) {
      let address = [person.address.houseNumber,
      person.address.firstLine,
      person.address.secondLine,
      person.address.town,
      person.address.postCode];
      return address.filter(item => item != undefined).join(', ');
    }
    return '';
  }

}
