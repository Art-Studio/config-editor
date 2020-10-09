import { AfterViewInit, Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appGetEvents]'
})
export class GetEventsDirective implements AfterViewInit {

  private obj = this.el.nativeElement;

  constructor(
    private el: ElementRef
  ) {}

  @HostListener('input') onInput(): void { this.change(); }

  ngAfterViewInit(): void{ this.change(); }

  private change(): void {
    this.resize();
  }

  private resize(): void {
    const len = this.obj.value.length;
    if (len > 20){
      this.obj.style.maxWidth = 'none';
      this.obj.style.height = this.obj.scrollHeight + 2 + 'px';
    }
  }

}
