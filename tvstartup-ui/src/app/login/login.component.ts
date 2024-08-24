import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit
{
    username: string = '';
    password: string = '';
    errorMessages: string[] = [];

    constructor(private renderer: Renderer2, private userService: UserService, private router:Router) { }

    onSubmit()
    {
      this.userService.login(this.username, this.password).subscribe(
      {
        next: (response) =>
        {
            console.log('Login successful', response);
            this.userService.saveToken(response.access);
            this.router.navigate(['/profile']);
        },
        error: (error) =>
        {
            if (error.status === 400 && error.error)
              this.errorMessages = Object.values(error.error).flat() as string[];
            else
              this.errorMessages = ['An unexpected error occurred. Please try again.'];
        },
        complete: () =>
        {
            console.log('Login request completed');
        }
      });
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
