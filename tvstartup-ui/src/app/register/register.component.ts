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


    constructor(private renderer: Renderer2, private userService: UserService, private router:Router) {}

    onSubmit()
    {
      console.log("Register Here");
      // this.userService.login(this.name, this.password).subscribe(
      //   (response) =>
      //   {
      //     console.log('Login successful', response);
      //     this.router.navigate(['/home']);
      //   },
      //   (error) =>
      //   {
      //     console.error('Login failed', error);
      //   }
      // );
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
