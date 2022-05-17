import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightSearched]'
})
export class HighlightSearchedDirective implements OnInit {

  @Input() fieldValue: string = "";
  @Input() globalSearchValue: string = "";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) { }
  
  ngOnInit(): void {
    const regex = new RegExp(this.globalSearchValue, 'i');
    const matchFound = regex.test(this.fieldValue);
    const matchValue = this.fieldValue.match(regex);

    if (matchFound && this.globalSearchValue && matchValue) {

      const mark = this.renderer.createElement('mark');
      const text = this.renderer.createText(matchValue[0]);
      this.renderer.appendChild(mark, text);

      const valueBeforeMark = this.fieldValue.substring(0, this.fieldValue.search(regex));
      const valueAfterMark = this.fieldValue.substring(
        this.fieldValue.search(regex) + this.globalSearchValue.length,
        this.fieldValue.length
      );

      const span = this.renderer.createElement('span');
      const valueBeforeMarkNode = this.renderer.createText(valueBeforeMark);
      const valueAfterMarkNode = this.renderer.createText(valueAfterMark);
      this.renderer.appendChild(span, valueBeforeMarkNode);
      this.renderer.appendChild(span, mark);
      this.renderer.appendChild(span, valueAfterMarkNode);

      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', "");
      this.renderer.appendChild(this.el.nativeElement, span);
    }
  }
}
