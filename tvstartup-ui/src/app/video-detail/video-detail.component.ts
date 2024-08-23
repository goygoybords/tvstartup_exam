import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from "../video.service"
import { VideoList } from '../video-list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet, RouterModule, CommonModule],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent implements  OnInit, AfterViewInit
{
    private videoId: number | null = null;
    video: VideoList | null = null;
    video_list: VideoList[] = [];

    constructor(private route: ActivatedRoute, private videoService: VideoService) {}

    ngOnInit(): void
    {
        this.displayMoreVideos();
        this.displaySpecificVideo();
    }

    private displayMoreVideos()
    {
        this.videoService.getVideos().subscribe((data: VideoList[]) =>
        {
          this.video_list = data;
        });
    }

    private displaySpecificVideo(): void
    {
        this.route.paramMap.subscribe(params => 
        {
          this.videoId = this.getVideoIdFromParams(params.get('id'));
          if (this.videoId !== null)
            this.fetchVideoById(this.videoId);
        });
    }

    private getVideoIdFromParams(idParam: string | null): number | null 
    {
        return idParam ? Number(idParam) : null;
    }
  
    private fetchVideoById(videoId: number): void
    {
        this.videoService.getVideoById(videoId).subscribe(data =>
        {
          this.video = data;
        });
    }

    ngAfterViewInit()
    {
      $('.tm-hero').each(function()
      {
          var imageSrc = $(this).attr('data-image-src');
          if (imageSrc)
            $(this).css('background-image', 'url(' + imageSrc + ')');
      });
    }
}
