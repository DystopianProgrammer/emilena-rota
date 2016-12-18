import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  errorText: string;

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    let text = this.route.queryParams.map(params => params['text'] || '404 - Page not found');
    text.forEach(value => this.errorText = value);
  }

  backClicked() {
    this.location.back();
  }
}

