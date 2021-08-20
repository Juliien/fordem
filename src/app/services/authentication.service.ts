import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token: string;
  decodedToken: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    if (this.isLogged()) {
      if (!this.token) {
        this.token = localStorage.getItem('token');
      }
      if (!this.decodedToken) {
        this.decodedToken = this.decodeToken(this.token);
      }
      if (!this.isTokenValid()) {
        // this.refreshToken().subscribe();
      }
    }
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'register', user);
  }

  login(credential: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'auth/login', credential);
  }

  // refreshToken(): Observable<any> {
  //
  // }

  logout(): void {
    this.token = null;
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
