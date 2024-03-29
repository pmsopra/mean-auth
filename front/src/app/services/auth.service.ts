import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('http://localhost:3000/users/register', user, { headers });
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('http://localhost:3000/users/authenticate', user, { headers });
  }

  getProfile() {
    this.loadToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken
    });

    return this.http
      .get('http://localhost:3000/users/profile', { headers });
  }

  storeUserData(token: string, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;

    localStorage.clear();
  }
}
