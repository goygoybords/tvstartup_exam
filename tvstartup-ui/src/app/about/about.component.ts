import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class AboutComponent implements AfterViewInit
{
  constructor(private renderer: Renderer2) { }

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
