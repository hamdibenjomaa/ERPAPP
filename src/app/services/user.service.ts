import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  private token: string | null = null;
  constructor(private http: HttpClient) { }
  private resetPasswordUrl = 'http://localhost:3000/auth/reset-password';

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token); // Store token in localStorage
    this.isAuthenticatedSubject.next(true);
  }
  private getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
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
        tap(response => {
          console.log('Login successful:', response);
          this.setToken(response.token); // Store token
        }),
        catchError(error => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }
  isAuthenticated(): boolean {
    return !!this.getToken(); // Return true if token exists, false otherwise
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem('token'); // Remove token from localStorage
    this.isAuthenticatedSubject.next(false);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/forgot-password', { login: email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.resetPasswordUrl}?token=${token}`, { newPassword });
  }
  getUserProfile(): Observable<any> {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, include it in the request headers
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>('http://localhost:3000/auth/profile', { headers });
    } else {
     
      return new Observable(observer => observer.error('Token not available'));
    }
  }
  uploadProfilePicture(file: File, userId: string) {
    const formData = new FormData();
    formData.append('profilePicture', file);

    // Make sure to adjust the endpoint to match your backend route
    return this.http.post(`http://localhost:3000/users/${userId}/upload`, formData);
  }
  getAllUsers(): Observable<any[]> {

     const token = localStorage.getItem('token');
    
    // If token exists, include it in the request headers
    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.get<any>('http://localhost:3000/users', { headers });
    } else {
     
      return new Observable(observer => observer.error('Token not available'));
    }
  }
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/users/register`, user);
  }
}  