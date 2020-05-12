import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appKeyDown]'
})
export class KeyDownDirective {

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {
    //this.renderer2.setStyle(this.elementRef.nativeElement, 'background', 'blue');
    document.addEventListener("visibilitychange", () => {
      console.log(document.hasFocus());
      alert('not allowed')
    })
    document.body.addEventListener('keydown', event => {
      if (event.ctrlKey && 't'.indexOf(event.key) !== -1) {
        alert('ctrl t');
        event.preventDefault();

      }
      if (event.ctrlKey && 'tncvxspwuaz'.indexOf(event.key) !== -1) {
        event.preventDefault();
        alert('ctrl')
      }
    })
  }

  // @HostListener('keydown', ['$event'])
  // newTabDisable(event: KeyboardEvent) {
  //   console.log(event.target.value);
  // }


}
