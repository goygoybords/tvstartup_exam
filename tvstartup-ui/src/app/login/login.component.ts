import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit
{
    name: string = '';
    password: string = '';
    constructor(private renderer: Renderer2, private userService: UserService, private router:Router) { }

    onSubmit()
    {
      this.userService.login(this.name, this.password).subscribe(
        (response) =>
        {
          console.log('Login successful', response);
        },
        (error) =>
        {
          console.error('Login failed', error);
        }
      );
    }

    // onSubmit()
    // {
    //   const user_details = { name : this.name, password : this.password};
    //   console.log("user_details = " + user_details);
    // }
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
