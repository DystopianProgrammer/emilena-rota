import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  lat: number;
  lng: number;

  isToggled: boolean = false;

  @Input() person;

  constructor() { }

  ngOnInit() {
    let location = this.person.address.location;
    this.lat = location.latitude;
    this.lng = location.longitude;
  }

  toggle() {
    this.isToggled = !this.isToggled;
  }
}
