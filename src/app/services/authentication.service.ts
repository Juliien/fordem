import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  decodedToken: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    if (this.isLogged()) {
      if (!this.decodedToken) {
        this.decodedToken = this.decodeToken(localStorage.getItem('token'));
      }
      if (!this.isTokenValid()) {
         this.refreshToken();
      }
    }
  }

  register(account: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'auth/register', account);
  }

  login(credential: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'auth/login', credential);
  }

  getToken(): string {
    if (this.isLogged() && !this.isTokenValid()) {
      this.refreshToken().subscribe(result => {
          localStorage.clear();
          localStorage.setItem('token', result.token);
          this.decodedToken = this.decodeToken(result.token);
        });
    }
    return localStorage.getItem('token');
  }

  refreshToken(): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<any>(environment.baseUrl + 'auth/token/refresh', options);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['home']).then();
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    return token && token.length > 1;
  }

  isTokenValid(): boolean {
    const currentDate = Math.round(new Date().getTime() / 1000);
    return Number(this.decodedToken.exp) > currentDate;
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }
}
