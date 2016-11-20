import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  errorText: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let text = this.route.queryParams.map(params => params['text'] || '404 - Page not found');
    text.forEach(value => this.errorText = value);
  }
}

