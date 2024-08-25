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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet, RouterModule, CommonModule, FormsModule],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent implements  OnInit, AfterViewInit
{
    private videoId: number | null = null;
    video: VideoList | null = null;
    video_list: VideoList[] = [];
    isEditing: boolean = false;
    description: string = '';
    newComment: string = '';
    isLoggedIn: boolean = true;
    
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

    navigateToDetail(id: number)
    {
      window.location.href = `/video-detail/${id}`;
    }
    
    toggleEditMode() {
      this.isEditing = !this.isEditing;
    }
  
    saveVideo()
    {
      console.log("save video");
      // this.videoService.updateVideo(this.video).subscribe(
      //   response => {
      //     console.log('Video updated successfully', response);
      //     this.isEditing = false;
      //   },
      //   error => {
      //     console.error('Error updating video', error);
      //   }
      // );
    }
    
    deleteVideo()
    {
      console.log("delete video");
    }
    postComment()
    {
      console.log("post comment");
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
