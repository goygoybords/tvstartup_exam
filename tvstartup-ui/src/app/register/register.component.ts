import { Component, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent
{
    first_name: string = '';
    last_name: string = '';
    email: string = '';
    username: string = '';
    password: string = '';
    confirm_password: string = '';
    errorMessages: string[] = [];
    passwordMismatch: boolean = false;

    constructor(private renderer: Renderer2, private userService: UserService, private router:Router) {}

    onSubmit()
    {
        if (this.password !== this.confirm_password)
        {
            this.passwordMismatch = true;
            this.errorMessages = ['Passwords do not match.!'];
            return;
        }

        this.passwordMismatch = false;
        const userData =
        {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            username: this.username,
            password: this.password
        };

        this.userService.register(userData).subscribe(
        {
          next: (response) => {
            console.log('Registration successful', response);
            this.router.navigate(['/login']);
          },
          error: (error) =>
          {
            if (error.status === 400 && error.error)
              this.errorMessages = Object.values(error.error).flat() as string[];
            else
              this.errorMessages = ['An unexpected error occurred. Please try again.'];
          },
          complete: () => {
            console.log('Registration request completed');
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
