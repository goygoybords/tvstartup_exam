import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SearchBarComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent
{
    constructor(public userService: UserService, private router: Router) {}

    logout()
    {
      this.userService.logout();
      this.router.navigate(['/login']);
    }
}
