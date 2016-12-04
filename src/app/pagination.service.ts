import { Injectable } from '@angular/core';

@Injectable()
export class PaginationService {

  constructor() { }

  /**
   * Returns a sublist of an array based on the page number and the total items per page.
   * 
   * @param items - the full array
   * @param pageNumber - the page requested
   * @param totalItemsPerPage - the total items per page
   */
  subList(items: any[], pageNumber: number, totalItemsPerPage: number): any[] {
    if(!items || items.length == 0) { return items; }
    let start = (pageNumber - 1) * totalItemsPerPage;
    let end = (start !== 0) ? start + totalItemsPerPage : totalItemsPerPage;

    return items.slice(start, end);
  }
}
