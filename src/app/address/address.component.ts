import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ViewContainerRef,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Location as aLocation } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { validate, ValidationError } from 'class-validator';

import { Person, Client, Staff, Address, Availability, PersonType, Location } from '../model';
import { PersonService } from '../person.service';
import { ErrorService } from '../error.service';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  animations: [
    trigger('navigationState', [
      state('*',
        style({
          opacity: 1
        })
      ),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  navigationState = true;
  person: Person;
  title: string = 'Address';
  selectedAddress: Address;
  selectedLocation: Location;
  addressNotFound: boolean = false;

  // used to map to an address object
  // see https://getaddress.io/Documentation
  addresses: string[];

  constructor(
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private errorService: ErrorService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private _location: aLocation,
    private personService: PersonService) { }

  ngOnInit() {
    this.person = this.personService.person;
    this.buildForm();
  }

  public addressFromPostCode(addressForm: FormGroup) {
    console.log(addressForm)
    this.person.address.postCode = addressForm.controls['postCode'].value;
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

  public selectAddress(address) {
    this.person.address = this.addressService.transformToAddress(address, this.person.address.postCode);
    this.person.address.location = this.selectedLocation;

    // and the reactive form
    this.buildForm();
  }

  public next(addressForm: FormGroup): void {
    this.person.address.firstLine = addressForm.controls['firstLine'].value;
    this.person.address.secondLine = addressForm.controls['secondLine'].value;
    this.person.address.town = addressForm.controls['town'].value;
    this.person.address.postCode = addressForm.controls['postCode'].value;

    this.router.navigate(['person-availability']);
  }

  public backClicked(): void {
    this._location.back();
  }

  public cancel() {
    this.personService.person = undefined;
    this.router.navigate(['person']);
  }

  private buildForm(): void {
    this.addressForm = this.formBuilder.group({
      firstLine: [this.person.address.firstLine, [Validators.required]],
      secondLine: [this.person.address.secondLine, [Validators.required, Validators.minLength(2)]],
      town: [this.person.address.town, [Validators.required, Validators.minLength(2)]],
      postCode: [this.person.address.postCode, [Validators.required, Validators.minLength(5)]],
      selectedAddress: ['']
    });
  }
}
