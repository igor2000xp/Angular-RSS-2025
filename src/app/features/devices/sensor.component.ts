import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sensor } from '../../core/models/dashboard.interface';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <ng-container
      *ngTemplateOutlet="
        layout() === 'horizontal' ? horizontalLayoutTemplate : verticalLayoutTemplate
      "
    ></ng-container>

    <ng-template #verticalLayoutTemplate let-sensorData>
      <div class="sensor-item">
        <div class="sensor-info">
          <mat-icon class="sensor-icon">{{ sensor().icon }}</mat-icon>
          <span class="sensor-label">{{ sensor().label }}</span>
        </div>
        <div class="sensor-value">{{ sensor().value }}{{ sensor().unit }}</div>
      </div>
    </ng-template>

    <ng-template #horizontalLayoutTemplate>
      <!-- <div class="sensor-container-horizontal"> -->
      <div class="sensor-item-horizontal">
        <div class="sensor-info-horizontal">
          <span class="sensor-label">{{ sensor().label }}</span>
          <mat-icon class="sensor-icon">{{ sensor().icon }}</mat-icon>
          <div class="sensor-value">{{ sensor().value }}{{ sensor().unit }}</div>
        </div>
      </div>
      <!-- </div> -->
    </ng-template>
  `,
  styles: [
    `
      .sensor-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-radius: 8px;
        background-color: #4a5568;
        margin-bottom: 8px;
        transition: background-color 0.2s ease;
      }

      .sensor-item-horizontal {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 2px 6px;
        border-radius: 8px;
        background-color: #4a5568;
        margin-bottom: 8px;
        transition: background-color 0.2s ease;
      }

      .sensor-item:hover {
        background-color: #718096;
      }

      .sensor-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .sensor-info-horizontal {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .sensor-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: #a0aec0;
      }

      .sensor-label {
        font-size: 14px;
        font-weight: 500;
        color: #e2e8f0;
      }

      .sensor-value {
        font-size: 16px;
        font-weight: 600;
        color: #4299e1;
        background-color: #2d3748;
        padding: 4px 8px;
        border-radius: 4px;
        min-width: 60px;
        text-align: center;
        border: 1px solid #4299e1;
      }
    `,
  ],
})
export class SensorComponent implements OnInit {
  sensor = input.required<Sensor>();
  layout = input<string>('vertical');

  ngOnInit(): void {
    // Ensure proper initialization
    console.log('Sensor component initialized');
  }
}
