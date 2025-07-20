import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Card, Device } from '../../core/models/dashboard.interface';
import { DashboardService } from '../../core/services/dashboard.service';
import { DeviceComponent } from '../devices/device.component';
import { SensorComponent } from '../devices/sensor.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSlideToggleModule, DeviceComponent, SensorComponent],
  template: `
    <mat-card class="card">
      <mat-card-header class="card-header">
        <mat-card-title class="card-title">{{ card().title }}</mat-card-title>
        <div class="card-actions" *ngIf="showGroupToggle()">
          <mat-slide-toggle
            [checked]="hasActiveDevices()"
            (change)="onGroupToggle($event.checked)"
            color="primary"
          >
            All Devices
          </mat-slide-toggle>
        </div>
      </mat-card-header>

      <mat-card-content class="card-content">
        <div class="items-container" [ngClass]="getLayoutClass()">
          @for (item of card().items; track item.label) {
            @if (item.type === 'device') {
              <app-device [device]="getDevice(item)" (deviceToggle)="onDeviceToggle($event)">
              </app-device>
            } @else {
              <app-sensor [sensor]="item"> </app-sensor>
            }
          }
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .card {
        margin-bottom: 16px;
        border-radius: 8px;
        background-color: #1f2937;
        border: 1px solid #374151;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }

      .card-header {
        padding: 12px 16px 8px 16px;
        border-bottom: 1px solid #374151;
      }

      .card-title {
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin: 0;
      }

      .card-actions {
        display: flex;
        align-items: center;
      }

      .card-content {
        padding: 12px 16px;
      }

      .items-container {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .items-container.horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 12px;
      }

      .items-container.horizontal app-device,
      .items-container.horizontal app-sensor {
        flex: 1;
        min-width: 180px;
      }

      .items-container.single {
        align-items: center;
      }

      .items-container.single app-device,
      .items-container.single app-sensor {
        width: 100%;
        max-width: 280px;
      }
    `,
  ],
})
export class CardComponent {
  card = input.required<Card>();
  tabId = input.required<string>();
  cardToggle = output<{ cardId: string; newState: boolean }>();
  deviceToggle = output<{ cardId: string; deviceIndex: number; newState: boolean }>();

  constructor(private dashboardService: DashboardService) {}

  showGroupToggle = computed(() => {
    return this.dashboardService.getControllableDevicesCount(this.card()) >= 2;
  });

  hasActiveDevices = computed(() => {
    return this.dashboardService.hasActiveDevices(this.card());
  });

  getLayoutClass(): string {
    switch (this.card().layout) {
      case 'horizontalLayout':
        return 'horizontal';
      case 'singleDevice':
        return 'single';
      case 'verticalLayout':
      default:
        return 'vertical';
    }
  }

  getDevice(item: any): Device {
    return item as Device;
  }

  onGroupToggle(newState: boolean): void {
    this.cardToggle.emit({
      cardId: this.card().id,
      newState,
    });
  }

  onDeviceToggle(event: { device: Device; newState: boolean }): void {
    const deviceIndex = this.card().items.findIndex(
      item => item.type === 'device' && item.label === event.device.label
    );

    if (deviceIndex !== -1) {
      this.deviceToggle.emit({
        cardId: this.card().id,
        deviceIndex,
        newState: event.newState,
      });
    }
  }
}
