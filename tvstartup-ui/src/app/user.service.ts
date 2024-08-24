import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
    private baseUrl = 'http://127.0.0.1:8000/account/';
    private apiUrl = "";

    constructor(private http: HttpClient) {}

    login(name: string, password: string): Observable<any>
    {
        this.apiUrl = "login_api";
        const loginData = { username: name, password: password };
        return this.http.post<any>(`${this.baseUrl}${this.apiUrl}`, loginData);
    }

    register(user: any): Observable<any>
    {
        this.apiUrl = "register_api";
        return this.http.post<any>(`${this.baseUrl}${this.apiUrl}`, user);
    }
}
