import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { SebmGoogleMap, LatLngLiteral, LatLng } from 'angular2-google-maps/core';

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

  @Input() person;

  constructor() { }

  ngOnInit() {
  }

  public showChildModal(): void {

    setTimeout(() => {
      this.googleMap.triggerResize().then(() => {
        let location = this.person.address.location;
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, 200);
    this.childModal.show();
  }

  public hideChildModal(): void {
    this.childModal.hide();
  }

}
