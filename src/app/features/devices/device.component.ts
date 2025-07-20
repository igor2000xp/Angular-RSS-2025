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
        padding: 8px 12px;
        border-radius: 6px;
        background-color: #374151;
        margin-bottom: 4px;
        transition: all 0.2s ease;
        border: 1px solid transparent;
      }

      .device-item:hover {
        background-color: #4b5563;
      }

      .device-info {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .device-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: #9ca3af;
        transition: color 0.2s ease;
      }

      .device-icon.active {
        color: #3b82f6;
      }

      .device-label {
        font-size: 13px;
        font-weight: 500;
        color: #d1d5db;
      }

      .active-device {
        background-color: #1e3a8a !important;
        border: 1px solid #3b82f6;
      }

      .active-device .device-icon {
        color: #3b82f6;
      }

      .active-device .device-label {
        color: #3b82f6;
      }

      ::ng-deep .mat-mdc-slide-toggle {
        --mdc-switch-selected-track-color: #3b82f6;
        --mdc-switch-selected-handle-color: #ffffff;
        --mdc-switch-unselected-track-color: #4b5563;
        --mdc-switch-unselected-handle-color: #9ca3af;
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
