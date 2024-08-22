import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { VideoService } from "../video.service"
import { VideoList } from '../video-list';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NavbarComponent, FooterComponent, CommonModule, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class HomeComponent implements OnInit  
{
    title = "Home";
    videos: VideoList[] = [];

    constructor(private videoService: VideoService, private datePipe:DatePipe) { }
    
    ngOnInit(): void {
      this.videoService.getVideos().subscribe(data => {
        this.videos = data.map(video => {
          const formattedVideo = {
            ...video,
            formatted_date: this.datePipe.transform(video.date_posted, 'MMM d, y, h:mm a')
          };
          return formattedVideo;
        });
      });
    }
    
}
