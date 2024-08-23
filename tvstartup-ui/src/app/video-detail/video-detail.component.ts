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
    
    constructor(private route: ActivatedRoute, private videoService: VideoService) {}

    ngOnInit(): void
    {
        this.route.paramMap.subscribe(params =>
        {
            const idParam = params.get('id');
            this.videoId = idParam ? Number(idParam) : null;
            if (this.videoId !== null)
            {
                this.videoService.getVideoById(this.videoId).subscribe(data =>
                {
                    this.video = data;
                });
            }
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
