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
    return computed(() => {
      const data = this.dashboardData();
      return data?.tabs || [];
    });
  }

  getTabById(tabId: string): Signal<Tab | undefined> {
    return computed(() => {
      const data = this.dashboardData();
      return data?.tabs?.find((tab: Tab) => tab.id === tabId);
    });
  }

  toggleDevice(tabId: string, cardId: string, deviceIndex: number): void {
    this.dashboardData.update(data => {
      if (!data) return data;

      const newData = { ...data };
      const tab = newData.tabs?.find(t => t.id === tabId);
      if (tab) {
        const card = tab.cards?.find(c => c.id === cardId);
        if (card && card.items && card.items[deviceIndex]) {
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
      if (!data) return data;

      const newData = { ...data };
      const tab = newData.tabs?.find(t => t.id === tabId);
      if (tab) {
        const card = tab.cards?.find(c => c.id === cardId);
        if (card && card.items) {
          card.items.forEach(item => {
            if (item && item.type === 'device') {
              (item as Device).state = state;
            }
          });
        }
      }
      return newData;
    });
  }

  getControllableDevicesCount(card: Card): number {
    if (!card || !card.items) return 0;
    return card.items.filter(item => item && item.type === 'device').length;
  }

  hasActiveDevices(card: Card): boolean {
    if (!card || !card.items) return false;
    return card.items.some(item => item && item.type === 'device' && (item as Device).state);
  }
}
