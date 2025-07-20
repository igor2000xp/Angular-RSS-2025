import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Device } from '../../core/models/dashboard.interface';
import { ActiveDeviceDirective } from '../../shared/directives/active-device.directive';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSlideToggleModule, ActiveDeviceDirective],
  template: `
    <div class="device-item" [appActiveDevice]="device().state">
      <div class="device-info">
        <mat-icon class="device-icon" [class.active]="device().state">
          {{ device().icon }}
        </mat-icon>
        <span class="device-label">{{ device().label }}</span>
      </div>

      <mat-slide-toggle
        [checked]="device().state"
        (change)="onToggle($event.checked)"
        color="primary"
      >
      </mat-slide-toggle>
    </div>
  `,
  styles: [
    `
      .device-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-radius: 8px;
        background-color: #f8f9fa;
        margin-bottom: 8px;
        transition: all 0.2s ease;
      }

      .device-item:hover {
        background-color: #e9ecef;
      }

      .device-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .device-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: #6c757d;
        transition: color 0.2s ease;
      }

      .device-icon.active {
        color: #1976d2;
      }

      .device-label {
        font-size: 14px;
        font-weight: 500;
        color: #495057;
      }

      .active-device {
        background-color: #e3f2fd !important;
        border: 1px solid #1976d2;
      }

      .active-device .device-icon {
        color: #1976d2;
      }

      .active-device .device-label {
        color: #1976d2;
      }
    `,
  ],
})
export class DeviceComponent {
  device = input.required<Device>();
  deviceToggle = output<{ device: Device; newState: boolean }>();

  onToggle(newState: boolean): void {
    this.deviceToggle.emit({
      device: this.device(),
      newState,
    });
  }
}
