import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { VideoService } from "../video.service"
import { VideoList } from '../video-list';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ NavbarComponent, FooterComponent, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class HomeComponent {
  title = 'Home';
  videos: VideoList[] = [];

  constructor(private videoService: VideoService) {}

  fetchVideos()
  {
    this.videoService.getVideos().subscribe((data: VideoList[]) => {
      this.videos = data;
    });
  }

  ngOnInit(): void
  {
    this.fetchVideos();
  }
}
