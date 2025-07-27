import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Device } from '../../core/models/dashboard.interface';
import { ActiveDeviceDirective } from '../../shared/directives/active-device.directive';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSlideToggleModule, ActiveDeviceDirective],
  template: `
    @if (isValidDevice()) {
      <div class="device-item" [appActiveDevice]="device().state">
        <div class="device-info">
          <mat-icon class="device-icon" [class.active]="device().state">
            {{ device().icon || 'device_unknown' }}
          </mat-icon>
          <span class="device-label">{{ device().label || 'Unknown Device' }}</span>
        </div>
        <mat-slide-toggle
          [checked]="device().state"
          (change)="onToggle($event.checked)"
          color="primary"
          [disabled]="isLoading()"
        >
        </mat-slide-toggle>
      </div>
    } @else {
      <div class="device-error">
        <mat-icon class="error-icon">error_outline</mat-icon>
        <span class="error-message">{{ getErrorMessage() }}</span>
      </div>
    }
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

      .device-error {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        border-radius: 8px;
        background-color: #fed7d7;
        border: 1px solid #f56565;
        margin-bottom: 8px;
      }

      .error-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: #e53e3e;
      }

      .error-message {
        font-size: 14px;
        color: #c53030;
        font-weight: 500;
      }
    `,
  ],
})
export class DeviceComponent implements OnInit {
  device = input.required<Device>();
  layout = input<string>('vertical');
  deviceToggle = output<{ device: Device; newState: boolean }>();
  deviceError = output<{ device: Device; error: string }>();

  isLoading = signal(false);
  private errorState = signal<string | null>(null);

  isValidDevice = computed(() => {
    try {
      const device = this.device();
      return (
        device &&
        typeof device === 'object' &&
        typeof device.state === 'boolean' &&
        (device.label || device.icon)
      );
    } catch (error) {
      this.setError('Invalid device data');
      return false;
    }
  });

  ngOnInit(): void {
    try {
      console.log('Device component initialized');
      this.validateDevice();
    } catch (error) {
      this.setError('Failed to initialize device component');
      console.error('Device component initialization error:', error);
    }
  }

  private validateDevice(): void {
    const device = this.device();

    if (!device) {
      throw new Error('Device data is required');
    }

    if (typeof device.state !== 'boolean') {
      throw new Error('Device state must be a boolean value');
    }

    if (!device.label && !device.icon) {
      throw new Error('Device must have either a label or icon');
    }
  }

  private setError(message: string): void {
    this.errorState.set(message);
    this.deviceError.emit({
      device: this.device(),
      error: message,
    });
  }

  getErrorMessage(): string {
    return this.errorState() || 'Unknown device error';
  }

  onToggle(newState: boolean): void {
    try {
      this.isLoading.set(true);

      if (!this.isValidDevice()) {
        throw new Error('Cannot toggle invalid device');
      }

      this.deviceToggle.emit({
        device: this.device(),
        newState,
      });

      // Simulate loading state for better UX
      setTimeout(() => {
        this.isLoading.set(false);
      }, 300);
    } catch (error) {
      this.setError(
        `Failed to toggle device: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      this.isLoading.set(false);
      console.error('Device toggle error:', error);
    }
  }
}
