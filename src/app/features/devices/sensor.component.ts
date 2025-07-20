import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sensor } from '../../core/models/dashboard.interface';
import { SensorValuePipe } from '../../shared/pipes/sensor-value.pipe';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, MatIconModule, SensorValuePipe],
  template: `
    <div class="sensor-item">
      <div class="sensor-info">
        <mat-icon class="sensor-icon">
          {{ sensor().icon }}
        </mat-icon>
        <span class="sensor-label">{{ sensor().label }}</span>
      </div>

      <div class="sensor-value">
        {{ sensor().value | sensorValue }}
      </div>
    </div>
  `,
  styles: [
    `
      .sensor-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        border-radius: 6px;
        background-color: #374151;
        margin-bottom: 4px;
        transition: background-color 0.2s ease;
      }

      .sensor-item:hover {
        background-color: #4b5563;
      }

      .sensor-info {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .sensor-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: #9ca3af;
      }

      .sensor-label {
        font-size: 13px;
        font-weight: 500;
        color: #d1d5db;
      }

      .sensor-value {
        font-size: 14px;
        font-weight: 600;
        color: #3b82f6;
        background-color: #1e3a8a;
        padding: 4px 8px;
        border-radius: 4px;
        min-width: 60px;
        text-align: center;
        border: 1px solid #3b82f6;
      }
    `,
  ],
})
export class SensorComponent {
  sensor = input.required<Sensor>();
}
