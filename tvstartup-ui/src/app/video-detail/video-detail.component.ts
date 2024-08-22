import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-detail',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet, RouterModule],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent implements  OnInit, AfterViewInit
{
  videoId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id'); // Access the id parameter
      console.log("id = " + this.videoId); // Do something with the id
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
