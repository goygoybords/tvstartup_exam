import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VideoList } from './video-list';

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
    
    getVideosByLoggedInUser(): Observable<any>
    {
        const headers = this.declareAuthenticationHeaders();
        this.apiUrl = "profile_api";
        return this.http.get(`${this.baseUrl}${this.apiUrl}`, { headers });
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

    declareAuthenticationHeaders(): HttpHeaders
    {
        const token = this.getToken();
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
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

    updateProfile(userId: number, profileData: UserModel): Observable<UserModel>
    {
        const headers = this.declareAuthenticationHeaders();
        this.apiUrl = "update_profile_api/";
        return this.http.put<UserModel>(`${this.baseUrl}${this.apiUrl}${userId}`, profileData, { headers });
    }
  }
