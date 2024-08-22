import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit
{
    ngOnInit(): void
    {
        const script = document.createElement('script');
        script.src = '/assets/js/video.js';
        script.async = true;
        document.body.appendChild(script);
    }
}