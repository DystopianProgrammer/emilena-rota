import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {


  @Input('group') personDetailsForm;

  constructor() { }

  ngOnInit() {
  }

}
