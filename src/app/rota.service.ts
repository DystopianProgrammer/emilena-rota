import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { Person, Staff, Client, Rota } from './model';
import { AuthService } from './auth.service';


@Injectable()
export class RotaService {

  constructor(private http: Http, private authService: AuthService) { }

  /**
   * return a rota for the week
   */
  rotaForWeek(date: string): Observable<Rota> {
        return this.http.get(`/emilena-api/rota/${date}`, this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json() as Rota);
  }

}
