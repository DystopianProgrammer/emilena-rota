import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private viewContainerRef:ViewContainerRef) { }

  ngOnInit() { }

}
