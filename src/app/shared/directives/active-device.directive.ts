import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appActiveDevice]',
  standalone: true,
})
export class ActiveDeviceDirective {
  @Input() set appActiveDevice(isActive: boolean) {
    if (isActive) {
      this.renderer.addClass(this.el.nativeElement, 'active-device');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active-device');
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
}
