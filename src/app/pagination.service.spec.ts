/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PaginationService } from './pagination.service';

describe('Service: Pagination', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationService]
    });
  });

  it('should return current list when list is undefined', inject([PaginationService], (service: PaginationService) => {

    let result = service.subList(undefined, 1, 4);
    expect(result).toBeFalsy();
  }));

  it('should return current list when list is null', inject([PaginationService], (service: PaginationService) => {

    let result = service.subList(null, 1, 4);
    expect(result).toBeFalsy();
  }));

  it('should return current list when list is empty', inject([PaginationService], (service: PaginationService) => {

    let result = service.subList([], 1, 4);
    expect(result).toBeTruthy();
  }));

  it('should return new list with first 4 items', inject([PaginationService], (service: PaginationService) => {

    // given
    let fruit = ['apple', 'orange', 'banana', 'peach', 'apricot', 'nectarine', 'pineapple', 'guava', 'strawberry'];

    // when 
    let result = service.subList(fruit, 1, 4);

    // then
    expect(fruit.length).toEqual(9); // unchanged original array
    expect(result.length).toEqual(4);
    expect(result[0]).toBe('apple');
    expect(result[1]).toBe('orange');
    expect(result[2]).toBe('banana');
    expect(result[3]).toBe('peach');
  }));

  it('should return new list with second 4 items', inject([PaginationService], (service: PaginationService) => {

    // given
    let fruit = ['apple', 'orange', 'banana', 'peach', 'apricot', 'nectarine', 'pineapple', 'guava', 'strawberry'];

    // when 
    let result = service.subList(fruit, 2, 4);

    // then
    expect(fruit.length).toEqual(9); // unchanged original array
    expect(result.length).toEqual(4);
    expect(result[0]).toBe('apricot');
    expect(result[1]).toBe('nectarine');
    expect(result[2]).toBe('pineapple');
    expect(result[3]).toBe('guava');
  }));

  it('should return new list with final items', inject([PaginationService], (service: PaginationService) => {

    // given
    let fruit = ['apple', 'orange', 'banana', 'peach', 'apricot', 'nectarine', 'pineapple', 'guava', 'strawberry'];

    // when 
    let result = service.subList(fruit, 3, 4);

    // then
    expect(fruit.length).toEqual(9); // unchanged original array
    expect(result.length).toEqual(1);
    expect(result[0]).toBe('strawberry');
  }));

});
