import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent
{
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch()
  {
    console.log('Search query:', this.searchQuery);
    this.router.navigate(['/home'], { queryParams: { search: this.searchQuery } });
  }

}
