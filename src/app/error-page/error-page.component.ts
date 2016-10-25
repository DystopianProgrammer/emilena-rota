import { Component, OnInit, HostBinding } from '@angular/core';
import { animations } from '../shared/index';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  animations
})
export class ErrorPageComponent implements OnInit {

  errorText: string;

  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let text = this.route.queryParams
      .map(params => params['text'] || 'None');
    text.forEach(value => this.errorText = value);
  }

}
