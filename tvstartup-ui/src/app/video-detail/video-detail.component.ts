import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from "../video.service"
import { VideoList } from '../video-list';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsModel } from '../comments-model';
import { UserService } from '../user.service';

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
    comment_list: CommentsModel[] = [];
    isEditing: boolean = false;
    description: string = '';
    title: string = '';
    newComment: string = '';
    isConfirmDeleteVisible: boolean = false;
    
    constructor(private route: ActivatedRoute, private videoService: VideoService, private router: Router, private userService:UserService) {}

    ngOnInit(): void
    {
        this.displayMoreVideos();
        this.displaySpecificVideo();
    }

    displayMoreVideos()
    {
        this.videoService.getVideos().subscribe((data: VideoList[]) =>
        {
          this.video_list = data;
        });
    }

    displaySpecificVideo(): void
    {
        this.route.paramMap.subscribe(params => 
        {
          this.videoId = this.getVideoIdFromParams(params.get('id'));
          if (this.videoId !== null)
            this.fetchVideoById(this.videoId);
        });
    }

    getVideoIdFromParams(idParam: string | null): number | null 
    {
        return idParam ? Number(idParam) : null;
    }
  
    fetchVideoById(videoId: number): void
    {
        this.videoService.getVideoById(videoId).subscribe(
        data =>
        {
            this.video = data.videos;
            this.comment_list = data.comments
        });
    }

    navigateToDetail(id: number)
    {
      window.location.href = `/video-detail/${id}`;
    }
    
    toggleEditMode()
    {
      this.isEditing = !this.isEditing;
    }

    updateVideo(id: number, video: VideoList): void
    {
      if (id)
      {
        this.videoService.updateVideo(id,video).subscribe(
        {
          next: (response) =>
          {
            console.log('Video updated successfully', response);
            this.isEditing = false;
          },
          error: (error) => {
            console.error('Error updating video', error);
          }
        });
      }
    }

    deleteVideo(videoId: number, video: VideoList)
    {
      this.videoService.deleteVideo(videoId, video).subscribe(
      {
        next: (response) =>
        {
            console.log('Video deleted successfully', response);
            this.router.navigate(['/profile']);
        },
        error: (error) =>
        {
            console.error('Error deleting video', error);
        }
      });
    }

    isLoggedIn(): boolean
    {
        return this.userService.isLoggedIn();
    }

    postComment(video_id: number)
    {
      if (this.newComment.trim())
      {
          this.videoService.postComment(video_id, this.newComment).subscribe(
              (response) =>
              {
                  console.log('Comment posted successfully', response);
                  this.newComment = '';
              },
              (error) => {
                  console.error('Error posting comment', error);
              }
          );
      }
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
