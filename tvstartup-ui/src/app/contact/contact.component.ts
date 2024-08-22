import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
export class ContactComponent implements AfterViewInit {

  ngAfterViewInit()
  {
    $('.tm-hero').each(function()
    {
        var imageSrc = $(this).attr('data-image-src');
        if (imageSrc)
          $(this).css('background-image', 'url(' + imageSrc + ')');
    });
  }
}
