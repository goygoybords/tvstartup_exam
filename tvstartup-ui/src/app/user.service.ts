import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService
{
    private baseUrl = 'http://127.0.0.1:8000/account/login_api';
    private videoEndpoint = "";

    constructor(private http: HttpClient) {}

    login(name: string, password: string): Observable<any>
    {
        const loginData = { username: name, password: password };
        return this.http.post<any>(this.baseUrl, loginData);
    }
}
