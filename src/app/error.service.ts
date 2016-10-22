import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Injectable()
export class ErrorService {

  constructor(private router: Router) { }

  handleError(error: string): any {
    let navExtras: NavigationExtras = {
      queryParams: { 'text': error }
    };

    this.router.navigate(['error'], navExtras);
  }

}
