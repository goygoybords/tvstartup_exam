import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { VideoService } from '../video.service';
import { UserService } from '../user.service';
import { VideoList } from '../video-list';
import { UserModel } from '../user-model';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit
{
    profile: UserModel[] = [];
    videos: VideoList[] = [];
    constructor(private videoService: UserService, private renderer: Renderer2) {}

    fetchLoggedUserVideos()
    {
      this.videoService.getVideosByLoggedInUser().subscribe(
      {
        next: (response) =>
        {
          this.profile = response.profile;
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
