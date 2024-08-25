import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoList } from './video-list';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class VideoService
{
    private baseUrl = 'http://127.0.0.1:8000/';
    private videoEndpoint = "";

    constructor(private http: HttpClient, private userService: UserService) {}

    getVideos(): Observable<VideoList[]>
    {
        this.videoEndpoint = "video_list_api/";
        return this.http.get<VideoList[]>(this.baseUrl + this.videoEndpoint);
    }

    getVideoById(id: number): Observable<VideoList>
    {
        this.videoEndpoint = "view_video_api/";
        return this.http.get<VideoList>(`${this.baseUrl}${this.videoEndpoint}${id}`);
    }

    searchVideos(query: string): Observable<VideoList[]>
    {
        this.videoEndpoint = "search_video_api/";
        return this.http.get<VideoList[]>(`${this.baseUrl}${this.videoEndpoint}?search=${query}`);
    }

    deleteVideo(videoId: number): Observable<any>
    {
        this.videoEndpoint = "delete_video_api/";
        const headers = this.userService.declareAuthenticationHeaders();
        return this.http.post(`${this.baseUrl}${this.videoEndpoint}${videoId}`, {headers});
    }

    updateVideo(userId: number, videoData: VideoList): Observable<VideoList>
    {
        const headers = this.userService.declareAuthenticationHeaders();
        this.videoEndpoint = "update_video_api/";
        return this.http.put<VideoList>(`${this.baseUrl}${this.videoEndpoint}${userId}`, videoData, { headers });
    }
}
