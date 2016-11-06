import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { Person, Staff, Client } from './model';
import { AuthService } from './auth.service';


@Injectable()
export class RotaService {

  constructor(private http: Http, private authService: AuthService) { }

}
