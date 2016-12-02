import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { SebmGoogleMap, LatLngLiteral, LatLng } from 'angular2-google-maps/core';
import { PersonService } from '../person.service';
import { AddressService } from '../address.service';
import { ErrorService } from '../error.service';
import { Person, Client, Address, PersonType, Location } from '../model';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;
  @ViewChild('googleMap') public googleMap: SebmGoogleMap;

  lat: number;
  lng: number;

  /**
   * For the purposes of correcting an invalid post code
   */
  addresses: string[];
  invalidCoords: boolean;
  addressNotFound: boolean = false;
  selectedLocation: Location;
  addressUpdated: boolean = false;

  @Input() person;

  constructor(private addressService: AddressService,
    private personService: PersonService,
    private errorService: ErrorService) { }

  ngOnInit() {
    this.invalidCoords = (this.person.address.location === null) ? true : false;
  }

  public showChildModal(): void {

    setTimeout(() => {
      this.googleMap.triggerResize().then(() => {
        let location = this.person.address.location;
        if (location === null) {
          this.invalidCoords = true;
        } else {
          this.lat = location.latitude;
          this.lng = location.longitude;
        }
      });
    }, 200);
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

  addressFromPostCode() {
    if (this.person.address.postCode) {
      this.addressService.address(this.person.address.postCode).subscribe(res => {
        if (res === undefined) {
          this.addressNotFound = true;
        } else {
          this.selectedLocation = this.addressService.transformToLocation(res);
          this.addresses = res.Addresses;
          this.addressNotFound = false;
        }
      }, err => {
        if (err.status === 404) {
          this.addressNotFound = true;
        } else {
          this.errorService.handleError(err);
        }
      });
    }
  }

  save() {
    this.personService.updateClient(this.person).subscribe(res => {
    });
  }

  selectAddress(event) {
    this.person.address = this.addressService.transformToAddress(event, this.person.address.postCode);
    this.person.address.location = this.selectedLocation;
    this.addressUpdated = true;
  }

}
