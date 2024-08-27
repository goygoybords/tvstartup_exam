import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { VideoService } from "../video.service"
import { VideoList } from '../video-list';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})

export class HomeComponent
{
    videos: VideoList[] = [];

    constructor(private videoService: VideoService, private searchService:SearchService, private route: ActivatedRoute,) {}

    fetchVideos()
    {
      this.videoService.getVideos().subscribe((data: VideoList[]) => {
        this.videos = data;
      });
    }

    ngOnInit(): void
    {
      this.fetchVideos();

      // Listen to query params from the route
      this.route.queryParams.subscribe(params => {
        const search_data = params['search'];
        if (search_data) {
          this.searchVideos(search_data);
        }
      });

      // Listen to the search query changes from SearchService
      this.searchService.currentSearchQuery.subscribe(query => {
        if (query) {
          this.searchVideos(query);
        }
      });
  }

  searchVideos(query: string) {
    this.videoService.searchVideos(query).subscribe((data: VideoList[]) => {
      this.videos = data;
      console.log("Videos Goy = ", this.videos);
    });
  }
}
