import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from '../../core/services/dashboard.service';
import { CardListComponent } from '../cards/card-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, CardListComponent],
  template: `
    <div class="dashboard">
      <div class="tab-content">
        @if (currentTab(); as tab) {
          <app-card-list
            [cards]="getCardsForTab(tab.id)()"
            [tabId]="tab.id"
            (cardToggle)="onCardToggle($event)"
            (deviceToggle)="onDeviceToggle($event)"
          >
          </app-card-list>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        .dashboard {
          height: 100%;
          background-color: #1e1e1e;
          overflow-y: auto;
        }

        .tab-content {
          padding: 20px;
          background-color: #1e1e1e;
          min-height: calc(100vh - 120px);
        }

        @media (max-width: 768px) {
          .tab-content {
            padding: 16px;
          }
        }
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  selectedTabIndex = input<number>(0);
  tabs = this.dashboardService.getTabs();

  currentTab = computed(() => {
    const index = this.selectedTabIndex();
    const tabs = this.tabs();
    return tabs[index] || tabs[0];
  });

  ngOnInit(): void {
    // Ensure proper initialization
    console.log('Dashboard component initialized');
  }

  getCardsForTab(tabId: string) {
    return this.dashboardService.getCardsForTab(tabId);
  }

  onCardToggle(event: { cardId: string; newState: boolean }): void {
    this.dashboardService.toggleCard(event.cardId, event.newState);
  }

  onDeviceToggle(event: { cardId: string; deviceIndex: number; newState: boolean }): void {
    this.dashboardService.toggleDevice(event.cardId, event.deviceIndex, event.newState);
  }
}
