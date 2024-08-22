import { AfterViewInit, Component } from '@angular/core';
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
  ngAfterViewInit()
  {
    // Ensure this runs only after the view is initialized
    $('.tm-hero').each(function()
    {
        var imageSrc = $(this).attr('data-image-src');
        if (imageSrc)
          $(this).css('background-image', 'url(' + imageSrc + ')');
    });
  }
}
