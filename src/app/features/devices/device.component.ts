import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
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
        background-color: #4a5568;
        margin-bottom: 8px;
        transition: all 0.2s ease;
      }

      .device-item:hover {
        background-color: #718096;
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
        color: #a0aec0;
        transition: color 0.2s ease;
      }

      .device-icon.active {
        color: #4299e1;
      }

      .device-label {
        font-size: 14px;
        font-weight: 500;
        color: #e2e8f0;
      }

      .active-device {
        background-color: #2d3748 !important;
        border: 1px solid #4299e1;
      }

      .active-device .device-icon {
        color: #4299e1;
      }

      .active-device .device-label {
        color: #4299e1;
      }
    `,
  ],
})
export class DeviceComponent implements OnInit {
  device = input.required<Device>();
  deviceToggle = output<{ device: Device; newState: boolean }>();

  ngOnInit(): void {
    // Ensure proper initialization
    console.log('Device component initialized');
  }

  onToggle(newState: boolean): void {
    this.deviceToggle.emit({
      device: this.device(),
      newState,
    });
  }
}
