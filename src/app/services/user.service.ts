  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { catchError, map, tap } from 'rxjs/operators';
  import { BehaviorSubject, Observable, throwError } from 'rxjs';
  import { CookieService } from 'ngx-cookie-service';

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
    private token: string | null = null;

    constructor(private http: HttpClient,private cookieService: CookieService) { }
    private resetPasswordUrl = 'http://localhost:3000/auth/reset-password';


    private setToken(token: string): void {
      // Set cookie with secure flag
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      this.cookieService.set('token', token, expiryDate, undefined, undefined, true, 'Lax');
      this.isAuthenticatedSubject.next(true);
    }
    
  
    private getToken(): string | null {
      return this.cookieService.get('token') || null;
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
            if (error.status === 429) {
              console.error('Rate limit exceeded:', error);
              return throwError('Too many requests.Please try again later.');
            } else {
              console.error('Login failed:', error);
              return throwError('Login failed. Invalid email or password, Please try again.');
            }
          })
        );
    }
    isAuthenticated(): boolean {
      return !!this.getToken(); // Return true if token exists, false otherwise
    }
    logout(): void {
      this.cookieService.delete('token');
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
      const token = this.getToken();
      
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
    const token = this.getToken();
      
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any[]>('http://localhost:3000/users', { headers }).pipe(
          map(users => users.map(user => ({
            ...user,
            companyName: user.company ? user.company.nameCompany : null,
            isActive: user.isActive // Assuming isActive property exists in the user object
          })))
        );
      } else {
        return new Observable(observer => observer.error('Token not available'));
      }
    }
    createUser(user: any): Observable<any> {
      return this.http.post<any>(`http://localhost:3000/users/register`, user);
    }

    getAllUsersByCompany(companyId: string): Observable<any[]> {
      const token = this.getToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.get<any>(`http://localhost:3000/users/${companyId}/users`, { headers });
      } else {
        return new Observable(observer => observer.error('Token not available'));
      }
    }
    
    updateUser(userId: string, userData: any): Observable<any> {
      const token = this.getToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
        return this.http.put<any>(`http://localhost:3000/users/${userId}`, userData, { headers });
      } else {
        return new Observable(observer => observer.error('Token not available'));
      }
    }
    deactivateUser(userId: string) {
      const token = this.getToken();
      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });
    
        // Include the user ID in the URL
        return this.http.put<any>(`http://localhost:3000/users/${userId}/deactivate`, {}, { headers });
      } else {
        return new Observable(observer => observer.error('Token not available'));
      }
    }
    activateUser(userId: string): Observable<any> {
      const token = this.getToken();
      if (!token) {
        return new Observable(observer => observer.error('Token not available'));
      }
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
  
      return this.http.put<any>(`http://localhost:3000/users/${userId}/activate`, {}, { headers });
    }
   
   changePassword(currentPassword: string, newPassword: string): Observable<any> {
  const token = this.getToken();
  if (!token) {
    return new Observable(observer => observer.error('Token not available'));
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  // Pass both currentPassword and newPassword in the request body
  return this.http.post<any>('http://localhost:3000/auth/change-password', { currentPassword, newPassword }, { headers });
}

    
    
    // Helper method to extract the user ID from the JWT token
    private getUserIdFromToken(): string | null {
      const token = this.getToken();
      if (!token) {
        return null;
      }
      // Extract the payload part of the JWT token
      const payload = token.split('.')[1];
      // Decode the payload from base64
      const decodedPayload = window.atob(payload);
      // Parse the decoded payload as JSON to access the user ID
      const { userId } = JSON.parse(decodedPayload);
      return userId;
    }
    
  }