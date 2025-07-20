import { Component, signal } from '@angular/core';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidebarComponent, DashboardComponent],
  template: `
    <app-sidebar [isExpanded]="sidebarExpanded()" (sidebarToggle)="toggleSidebar()">
      <app-dashboard></app-dashboard>
    </app-sidebar>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  sidebarExpanded = signal(true);

  toggleSidebar(): void {
    this.sidebarExpanded.update(expanded => !expanded);
  }
}
