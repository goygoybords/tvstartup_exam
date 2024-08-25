import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { VideoService } from '../video.service';
import { UserService } from '../user.service';
import { VideoList } from '../video-list';
import { UserModel } from '../user-model';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit
{
    user: UserModel | null = null;
    videos: VideoList[] = [];
    isEditing: boolean = false;

    first_name: string = '';
    last_name: string = '';
    email: string = '';
    username: string = '';
    errorMessages: string[] = [];
  
    constructor(private userService: UserService, private renderer: Renderer2, private videoService: VideoService) {}

    fetchLoggedUserVideos()
    {
      this.userService.getVideosByLoggedInUser().subscribe(
      {
        next: (response) =>
        {
          this.user = response.profile;
          this.videos = response.videos;
        },
        error: (error) =>
        {
          console.error('Error fetching profile and videos', error);
        },
        complete: () =>
        {
          console.log('Profile and videos fetching completed');
        }
      });
    }

    toggleEditMode(): void
    {
      if (this.isEditing)
      {
        if (this.user)
        {
            this.userService.updateProfile(this.user.id, this.user).subscribe(
            {
              next: (response) =>
              {
                  console.log('Profile updated successfully', response);
                  this.isEditing = false;
                  this.errorMessages = [];
              },
              error: (error) =>
              {
                  if (error.status === 400 && error.error)
                      this.errorMessages = Object.values(error.error).flat() as string[];
                  else
                      this.errorMessages = ['An unexpected error occurred. Please try again.'];
                  this.isEditing = true;
              }
          });
        }
      }
      else
          this.isEditing = true;
    }

    ngOnInit(): void
    {
        this.fetchLoggedUserVideos();
    }

    ngAfterViewInit(): void
    {
      if (typeof document !== 'undefined')
      {
        const tmHeroes = document.querySelectorAll('.tm-hero');
        tmHeroes.forEach((tmHero) =>
        {
          const imageSrc = tmHero.getAttribute('data-image-src');
          if (imageSrc)
            this.renderer.setStyle(tmHero, 'background-image', `url(${imageSrc})`);
        });
      }
    }
}
