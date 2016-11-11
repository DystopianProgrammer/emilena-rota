import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

// TODO this actually just toggles classes on/off - a better name is required.
@Directive({ selector: '[dynamicClass]' })
export class DynamicClassDirective {

  private _defaultClasses: string[] = [];

  @Input('applyClass') classNames: string[];

  constructor(private el: ElementRef, private renderer: Renderer) { }

  @HostListener('click') onClick() {
    if(this._defaultClasses.length == 0) {
      this._defaultClasses = this._defaultClasses.concat(this.classNames);
      this._defaultClasses.forEach(item => this.el.nativeElement.classList.add(item));
    } else {
      this._defaultClasses.forEach(item => this.el.nativeElement.classList.remove(item));
      this._defaultClasses = [];
    }
  }
}
