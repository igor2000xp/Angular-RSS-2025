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
      <mat-tab-group
        [selectedIndex]="selectedTabIndex()"
        (selectedIndexChange)="onTabChange($event)"
        class="dashboard-tabs"
      >
        @for (tab of tabs(); track tab.id) {
          <mat-tab [label]="tab.title">
            <div class="tab-content">
              <app-card-list
                [cards]="tab.cards"
                [tabId]="tab.id"
                (cardToggle)="onCardToggle($event)"
                (deviceToggle)="onDeviceToggle($event)"
              >
              </app-card-list>
            </div>
          </mat-tab>
        }
      </mat-tab-group>
    </div>
  `,
  styles: [
    `
      .dashboard {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .dashboard-tabs {
        flex: 1;
      }

      .tab-content {
        padding: 20px;
        height: 100%;
        overflow-y: auto;
      }

      ::ng-deep .mat-mdc-tab-group {
        height: 100%;
      }

      ::ng-deep .mat-mdc-tab-body-wrapper {
        height: 100%;
      }

      ::ng-deep .mat-mdc-tab-body {
        height: 100%;
      }

      ::ng-deep .mat-mdc-tab-body-content {
        height: 100%;
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
