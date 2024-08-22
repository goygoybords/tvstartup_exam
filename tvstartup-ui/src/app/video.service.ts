import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VideoList } from './video-list';

@Injectable({
  providedIn: 'root'
})

export class VideoService
{
  private apiUrl = 'http://127.0.0.1:8000/video_list_api/';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<VideoList[]>
  {
      return this.http.get<VideoList[]>(this.apiUrl);
  }
}
