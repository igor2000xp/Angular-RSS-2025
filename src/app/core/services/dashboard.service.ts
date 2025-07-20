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

  getCardsForTab(tabId: string): Signal<Card[]> {
    return computed(() => {
      const tab = this.getTabById(tabId)();
      return tab?.cards || [];
    });
  }

  getControllableDevicesCount(card: Card): number {
    if (!card?.items) return 0;
    return card.items.filter(item => item?.type === 'device').length;
  }

  hasActiveDevices(card: Card): boolean {
    if (!card?.items) return false;
    return card.items.some(item => item?.type === 'device' && (item as Device).state);
  }

  toggleCard(cardId: string, newState: boolean): void {
    const currentData = this.dashboardData();
    if (!currentData?.tabs) return;

    const updatedTabs = currentData.tabs.map(tab => ({
      ...tab,
      cards: tab.cards.map(card => {
        if (card.id === cardId) {
          return {
            ...card,
            items: card.items.map(item => {
              if (item?.type === 'device') {
                return { ...item, state: newState } as Device;
              }
              return item;
            }),
          };
        }
        return card;
      }),
    }));

    this.dashboardData.set({ ...currentData, tabs: updatedTabs });
  }

  toggleDevice(cardId: string, deviceIndex: number, newState: boolean): void {
    const currentData = this.dashboardData();
    if (!currentData?.tabs) return;

    const updatedTabs = currentData.tabs.map(tab => ({
      ...tab,
      cards: tab.cards.map(card => {
        if (card.id === cardId) {
          const updatedItems = [...card.items];
          if (updatedItems[deviceIndex]?.type === 'device') {
            updatedItems[deviceIndex] = {
              ...updatedItems[deviceIndex],
              state: newState,
            } as Device;
          }
          return { ...card, items: updatedItems };
        }
        return card;
      }),
    }));

    this.dashboardData.set({ ...currentData, tabs: updatedTabs });
  }
}
