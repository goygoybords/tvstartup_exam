import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
    private baseUrl = 'http://127.0.0.1:8000/account/';
    private apiUrl = "";
    private readonly TOKEN_KEY = 'access_token';

    constructor(private http: HttpClient, private router:Router) {}

    register(user: any): Observable<any>
    {
        this.apiUrl = "register_api";
        return this.http.post<any>(`${this.baseUrl}${this.apiUrl}`, user);
    }

    login(name: string, password: string): Observable<any>
    {
        this.apiUrl = "login_api";
        const loginData = { username: name, password: password };
        return this.http.post<any>(`${this.baseUrl}${this.apiUrl}`, loginData);
    }

    saveToken(token: string): void
    {
        localStorage.setItem(this.TOKEN_KEY, token);
    }
    
    getToken(): string | null
    {
      if (typeof localStorage !== 'undefined')
          return localStorage.getItem(this.TOKEN_KEY);
      return null;
    }
    
    isLoggedIn(): boolean
    {
        return this.getToken() !== null;
    }
    
    logout(): Observable<any>
    {
        this.apiUrl = "logout_api";
        return this.http.post<any>(`${this.baseUrl}${this.apiUrl}`, {});
    }

    getTokenKey(): string
    {
        return this.TOKEN_KEY;
    }
  }
