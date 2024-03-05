import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  constructor(private http: HttpClient) { }
  private resetPasswordUrl = 'http://localhost:3000/auth/reset-password';

  
  signup(fullName: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users/register', { fullName, login: email, password })
      .pipe(
        catchError(error => {
          console.error('Signup failed:', error);
          throw error;
        })
      );
  }
  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', { login: email, password })
      .pipe(
        catchError(error => {
          console.error('Login failed:', error);
          throw error;
        })
      );
      this.isAuthenticatedSubject.next(true);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/forgot-password', { login: email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.resetPasswordUrl}?token=${token}`, { newPassword });
  }
}  