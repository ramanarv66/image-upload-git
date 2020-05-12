import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appRightClick]'
})
export class RightClickDirective {

  constructor() { }

  @HostListener('contextmenu', ['$event'])
  rightClickDisabled(event) {
    alert('Right Click disabled');
    event.preventDefault();
  }
}
