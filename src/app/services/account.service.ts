import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) { }

  getAccountsById(): Observable<any> {
    this.auth.refreshToken();
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.auth.token
      })
    };
    return this.http.get<any>(environment.baseUrl + 'accounts/' + this.auth.decodedToken.id, options);
  }
}
