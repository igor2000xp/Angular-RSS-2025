import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardService } from '../../core/services/dashboard.service';
import { CardListComponent } from '../cards/card-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, CardListComponent],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1 class="dashboard-title">Smart Home UI</h1>
        <mat-tab-group
          [selectedIndex]="selectedTabIndex()"
          (selectedIndexChange)="onTabChange($event)"
          class="dashboard-tabs"
        >
          @for (tab of tabs(); track tab.id) {
            <mat-tab [label]="tab.title"></mat-tab>
          }
        </mat-tab-group>
      </div>

      <div class="dashboard-content">
        @for (tab of tabs(); track tab.id; let i = $index) {
          <div class="tab-content" [class.active]="i === selectedTabIndex()">
            <app-card-list
              [cards]="tab.cards"
              [tabId]="tab.id"
              (cardToggle)="onCardToggle($event)"
              (deviceToggle)="onDeviceToggle($event)"
            >
            </app-card-list>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: #121212;
      }

      .dashboard-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 24px;
        background-color: #1f2937;
        border-bottom: 1px solid #374151;
      }

      .dashboard-title {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #ffffff;
      }

      .dashboard-tabs {
        flex: 1;
        max-width: 300px;
      }

      .dashboard-content {
        flex: 1;
        padding: 24px;
        overflow-y: auto;
      }

      .tab-content {
        display: none;
      }

      .tab-content.active {
        display: block;
      }

      ::ng-deep .mat-mdc-tab-group {
        background-color: transparent !important;
      }

      ::ng-deep .mat-mdc-tab-header {
        background-color: transparent !important;
        border-bottom: none !important;
      }

      ::ng-deep .mat-mdc-tab-label {
        color: #9ca3af !important;
        font-weight: 500;
        min-width: 80px;
        padding: 0 16px;
      }

      ::ng-deep .mat-mdc-tab-label.mat-mdc-tab-label-active {
        color: #3b82f6 !important;
      }

      ::ng-deep .mat-mdc-tab-header-pagination-chevron {
        color: #9ca3af !important;
      }

      ::ng-deep .mat-mdc-ink-bar {
        background-color: #3b82f6 !important;
      }
    `,
  ],
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);

  tabs = this.dashboardService.getTabs();
  selectedTabIndex = computed(() => 0); // Default to first tab

  onTabChange(index: number): void {
    // Handle tab change if needed
    console.log('Tab changed to index:', index);
  }

  onCardToggle(event: { cardId: string; newState: boolean }): void {
    const currentTab = this.tabs()[this.selectedTabIndex()];
    if (currentTab) {
      this.dashboardService.toggleAllDevices(currentTab.id, event.cardId, event.newState);
    }
  }

  onDeviceToggle(event: { cardId: string; deviceIndex: number; newState: boolean }): void {
    const currentTab = this.tabs()[this.selectedTabIndex()];
    if (currentTab) {
      this.dashboardService.toggleDevice(currentTab.id, event.cardId, event.deviceIndex);
    }
  }
}
