import { Directive, ElementRef, Renderer2, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[appActiveDevice]',
  standalone: true,
})
export class ActiveDeviceDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  appActiveDevice = input<boolean>(false);

  constructor() {
    effect(() => {
      const active = this.appActiveDevice();
      if (active) {
        this.renderer.addClass(this.el.nativeElement, 'active-device');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'active-device');
      }
    });
  }
}
