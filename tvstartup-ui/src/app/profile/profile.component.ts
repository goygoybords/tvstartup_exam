import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements AfterViewInit
{
  constructor(private renderer: Renderer2) {}

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
