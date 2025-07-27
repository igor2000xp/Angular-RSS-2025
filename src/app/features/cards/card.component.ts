import { CommonModule } from '@angular/common';
import { Component, computed, input, OnInit, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Card, Device, Sensor } from '../../core/models/dashboard.interface';
import { DashboardService } from '../../core/services/dashboard.service';
import { ActiveDeviceDirective } from '../../shared/directives/active-device.directive';
import { DeviceComponent } from '../devices/device.component';
import { SensorComponent } from '../devices/sensor.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    ActiveDeviceDirective,
    DeviceComponent,
    SensorComponent,
  ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
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
