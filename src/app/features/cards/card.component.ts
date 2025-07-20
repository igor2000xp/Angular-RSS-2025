import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Card, Device, Sensor } from '../../core/models/dashboard.interface';
import { DashboardService } from '../../core/services/dashboard.service';
import { DeviceComponent } from '../devices/device.component';
import { SensorComponent } from '../devices/sensor.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSlideToggleModule, DeviceComponent, SensorComponent],
  template: `
    <mat-card class="card" *ngIf="card()">
      <mat-card-header>
        <mat-card-title>{{ card().title }}</mat-card-title>
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

      <mat-card-content>
        <div class="card-content" [ngClass]="getLayoutClass()">
          @for (item of card().items || []; track item?.label) {
            @if (item?.type === 'device') {
              <app-device [device]="getDevice(item)" (deviceToggle)="onDeviceToggle($event)">
              </app-device>
            } @else if (item?.type === 'sensor') {
              <app-sensor [sensor]="getSensor(item)"> </app-sensor>
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
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.2s ease;
        background-color: #2d3748;
        border: 1px solid #4a5568;
      }

      .card:hover {
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      }

      mat-card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 16px 0 16px;
      }

      mat-card-title {
        font-size: 18px;
        font-weight: 600;
        color: #4299e1;
        margin: 0;
      }

      .card-actions {
        display: flex;
        align-items: center;
      }

      mat-card-content {
        padding: 16px;
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .card-content.horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
      }

      .card-content.horizontal app-device,
      .card-content.horizontal app-sensor {
        flex: 1;
        min-width: 200px;
      }

      .card-content.single {
        align-items: center;
      }

      .card-content.single app-device,
      .card-content.single app-sensor {
        width: 100%;
        max-width: 300px;
      }
    `,
  ],
})
export class CardComponent implements OnInit {
  card = input.required<Card>();
  tabId = input.required<string>();
  cardToggle = output<{ cardId: string; newState: boolean }>();
  deviceToggle = output<{ cardId: string; deviceIndex: number; newState: boolean }>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Ensure proper initialization
    console.log('Card component initialized');
  }

  showGroupToggle = computed(() => {
    const currentCard = this.card();
    if (!currentCard) return false;
    return this.dashboardService.getControllableDevicesCount(currentCard) >= 2;
  });

  hasActiveDevices = computed(() => {
    const currentCard = this.card();
    if (!currentCard) return false;
    return this.dashboardService.hasActiveDevices(currentCard);
  });

  getLayoutClass(): string {
    const currentCard = this.card();
    if (!currentCard) return 'vertical';

    switch (currentCard.layout) {
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

  getSensor(item: any): Sensor {
    return item as Sensor;
  }

  onGroupToggle(newState: boolean): void {
    const currentCard = this.card();
    if (!currentCard) return;

    this.cardToggle.emit({
      cardId: currentCard.id,
      newState,
    });
  }

  onDeviceToggle(event: { device: Device; newState: boolean }): void {
    const currentCard = this.card();
    if (!currentCard || !currentCard.items) return;

    const deviceIndex = currentCard.items.findIndex(
      item => item && item.type === 'device' && item.label === event.device.label
    );

    if (deviceIndex !== -1) {
      this.deviceToggle.emit({
        cardId: currentCard.id,
        deviceIndex,
        newState: event.newState,
      });
    }
  }
}
