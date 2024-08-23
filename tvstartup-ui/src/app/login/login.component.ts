import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit {

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
