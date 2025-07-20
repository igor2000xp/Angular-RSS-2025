import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
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
                [cards]="getCardsForTab(tab.id)()"
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
        background-color: #1e1e1e;
      }

      .dashboard-tabs {
        height: 100%;
      }

      .dashboard-tabs ::ng-deep .mat-mdc-tab-header {
        background-color: #2d3748;
        border-bottom: 1px solid #4a5568;
      }

      .dashboard-tabs ::ng-deep .mat-mdc-tab-label {
        color: #a0aec0;
        font-weight: 500;
      }

      .dashboard-tabs ::ng-deep .mat-mdc-tab-label.mat-mdc-tab-label-active {
        color: #4299e1;
      }

      .dashboard-tabs ::ng-deep .mat-mdc-tab-header-pagination-chevron {
        color: #a0aec0;
      }

      .dashboard-tabs ::ng-deep .mat-mdc-ink-bar {
        background-color: #4299e1;
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
    `,
  ],
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  tabs = this.dashboardService.getTabs();
  selectedTabIndex = signal(0);

  ngOnInit(): void {
    // Ensure proper initialization
    console.log('Dashboard component initialized');
  }

  getCardsForTab(tabId: string) {
    return this.dashboardService.getCardsForTab(tabId);
  }

  onTabChange(index: number): void {
    this.selectedTabIndex.set(index);
  }

  onCardToggle(event: { cardId: string; newState: boolean }): void {
    this.dashboardService.toggleCard(event.cardId, event.newState);
  }

  onDeviceToggle(event: { cardId: string; deviceIndex: number; newState: boolean }): void {
    this.dashboardService.toggleDevice(event.cardId, event.deviceIndex, event.newState);
  }
}
