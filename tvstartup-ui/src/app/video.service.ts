import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoList } from './video-list';

@Injectable({
  providedIn: 'root'
})

export class VideoService
{
    private baseUrl = 'http://127.0.0.1:8000/';
    private videoEndpoint = "";

    constructor(private http: HttpClient) {}

    getVideos(): Observable<VideoList[]>
    {
        this.videoEndpoint = "video_list_api/";
        return this.http.get<VideoList[]>(this.baseUrl + this.videoEndpoint);
    }

    getVideoById(id: number): Observable<VideoList>
    {
        this.videoEndpoint = "view_video_api/";
        return this.http.get<VideoList>(`${this.baseUrl}${this.videoEndpoint}${id}/`);
    }
}
