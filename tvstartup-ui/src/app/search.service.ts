import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService
{
  private searchQuerySource = new BehaviorSubject<string>(''); // Default is an empty string
  currentSearchQuery = this.searchQuerySource.asObservable();

  constructor() {}

  updateSearchQuery(query: string)
  {
    this.searchQuerySource.next(query);
  }
}
