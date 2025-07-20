import { computed, Injectable, signal, Signal } from '@angular/core';
import { Card, DashboardData, Device, Tab } from '../models/dashboard.interface';

// Import mock data
import dashboardData from '../../../assets/mock-data/dashboard-data.json';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardData = signal<DashboardData>(dashboardData as DashboardData);

  getDashboardData(): Signal<DashboardData> {
    return this.dashboardData.asReadonly();
  }

  getTabs(): Signal<Tab[]> {
    return computed(() => this.dashboardData().tabs);
  }

  getTabById(tabId: string): Signal<Tab | undefined> {
    return computed(() => this.dashboardData().tabs.find((tab: Tab) => tab.id === tabId));
  }

  toggleDevice(tabId: string, cardId: string, deviceIndex: number): void {
    this.dashboardData.update(data => {
      const newData = { ...data };
      const tab = newData.tabs.find(t => t.id === tabId);
      if (tab) {
        const card = tab.cards.find(c => c.id === cardId);
        if (card) {
          const device = card.items[deviceIndex];
          if (device && device.type === 'device') {
            (device as Device).state = !(device as Device).state;
          }
        }
      }
      return newData;
    });
  }

  toggleAllDevices(tabId: string, cardId: string, state: boolean): void {
    this.dashboardData.update(data => {
      const newData = { ...data };
      const tab = newData.tabs.find(t => t.id === tabId);
      if (tab) {
        const card = tab.cards.find(c => c.id === cardId);
        if (card) {
          card.items.forEach(item => {
            if (item.type === 'device') {
              (item as Device).state = state;
            }
          });
        }
      }
      return newData;
    });
  }

  getControllableDevicesCount(card: Card): number {
    return card.items.filter(item => item.type === 'device').length;
  }

  hasActiveDevices(card: Card): boolean {
    return card.items.some(item => item.type === 'device' && (item as Device).state);
  }
}
