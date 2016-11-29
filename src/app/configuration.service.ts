import { Injectable } from '@angular/core';
import { Http, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ConfigurationService {

  constructor(private http: Http, private authService: AuthService) { }

  getConfiguration(): Observable<Response> {
    return this.http.get('/emilena-api/configuration/all/', this.authService.requestOptionsWithJsonHeader())
      .map((r: Response) => r.json()).catch(err => Observable.throw(`Could not get configuration ${err}`));
  }
}
