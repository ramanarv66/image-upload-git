import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ResuableDialogComponent} from "../resuable-dialog/resuable-dialog.component";

@Directive({
  selector: '[appKeyDown]'
})
export class KeyDownDirective {

  constructor(private renderer2: Renderer2, private elementRef: ElementRef,public dialog: MatDialog) {
    //this.renderer2.setStyle(this.elementRef.nativeElement, 'background', 'blue');
    document.addEventListener("visibilitychange", () => {
      const dialogRef =  dialog.open(ResuableDialogComponent,{
        data: { eventName: 'nextpage' },
      });
    })
    document.body.addEventListener('keydown', event => {
      // if (event.ctrlKey && 't'.indexOf(event.key) !== -1) {
      //   event.preventDefault();
      //   const dialogRef =  dialog.open(ResuableDialogComponent,{
      //     data: { eventName: 'nextpage' },
      //   });
      // }
      if (event.ctrlKey && 'tncvxspwuaz'.indexOf(event.key) !== -1) {
        event.preventDefault();
      // Copy paste not allowed
        const dialogRef =  dialog.open(ResuableDialogComponent,{
          data: { eventName: 'ctrl' },
        });
      }
    })
  }

  // @HostListener('keydown', ['$event'])
  // newTabDisable(event: KeyboardEvent) {
  //   console.log(event.target.value);
  // }


}
