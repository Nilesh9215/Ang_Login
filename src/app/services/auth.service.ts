import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, last } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:44398/api/auth';

  constructor(private http: HttpClient) {}

  register(email: string, password: string, firstname: string, lastname: string): Observable<any> {

    const body = { email, password, firstname, lastname};
    
    return this.http.post(`${this.baseUrl}/register`, body).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<any> {

    const body = { email, password };

    return this.http.post<any>(`${this.baseUrl}/login`, body)
    .pipe(map(response => {
      
      // Assuming the response contains a token
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userDetails', JSON.stringify(response.userDetails));

        catchError(this.handleError)
      }
        return response;
      }));
  
      // return this.http.post(`${this.baseUrl}/login`, body).pipe(
      //   catchError(this.handleError)
      // );
    }
  
  // Method to get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  // Method to logout the user
   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
  }

  // Add an authorization header with the token for authenticated requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

 getUserDetails() {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails ? JSON.parse(userDetails) : null;
  }

  
  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }
}
