import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#0d6efd');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#f8f9fa');
  }

  private highlight(className: string) {
    this.elementRef.nativeElement.style.color = className;
  }

}
