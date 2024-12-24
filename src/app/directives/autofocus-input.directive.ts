
import {AfterViewInit, Directive,ElementRef} from '@angular/core'
@Directive({
  standalone:true,
  selector: '[autofocusInput]'
})
export class AutofocusInputDirective implements AfterViewInit{

  constructor(
    private elementRef: ElementRef
  ) {
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.focus();
  }

}
