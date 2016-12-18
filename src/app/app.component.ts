import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef, private router: Router) { }

  ngOnInit() {
    // bit of a hack - see https://github.com/angular/angular/issues/7791
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });
  }

}
