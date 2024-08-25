import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { userAccountInterceptor } from './user-account.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    HomeComponent, 
    NavbarComponent, 
    FooterComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
  {
      provide: HTTP_INTERCEPTORS,
      useValue: userAccountInterceptor,
      multi: true
  }
  ],
})

export class AppComponent implements OnInit
{
    title = "tvstartup-ui";
    ngOnInit(): void
    {
      if (typeof document !== 'undefined')
      {
        const script = document.createElement('script');
        script.src = '/assets/js/video.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
}