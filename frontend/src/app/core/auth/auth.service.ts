import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTH_TOKEN } from '../constants/app.constant';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private readonly validPasscode = 'Access@11';

  isAuthenticated(): boolean {
    return sessionStorage.getItem(AUTH_TOKEN) != undefined;
  }

  signInWithPasscode(passcode: string): Observable<any> {
    let loginUrl = `${environment.API_HOST}${environment.LOGIN_ENDPOINT}`;
    return this.http.post(loginUrl,{passcode});
  }

  signOut(): void {
    sessionStorage.removeItem(AUTH_TOKEN);
  }
}
