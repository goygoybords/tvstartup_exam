import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, Renderer2 } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ContactComponent implements AfterViewInit
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
