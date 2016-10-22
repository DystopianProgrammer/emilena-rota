/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';

describe('Pipe: CapitalizeFirst', () => {
  it('create an instance', () => {
    let pipe = new CapitalizeFirstPipe();
    let transformed = pipe.transform('MONDAY');

    expect(transformed).toBe('Monday');
  });
});
