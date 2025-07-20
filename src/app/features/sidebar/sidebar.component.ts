import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
    <mat-sidenav-container class="sidebar-container">
      <mat-sidenav
        #sidenav
        mode="side"
        opened
        class="sidebar"
        [class.sidebar-collapsed]="!isExpanded()"
      >
        <!-- Sidebar Header -->
        <div class="sidebar-header">
          <h2 class="sidebar-title">Smart Home UI</h2>
          <button mat-icon-button (click)="toggleSidebar()" class="toggle-button">
            <mat-icon>menu</mat-icon>
          </button>
        </div>

        <!-- Sidebar Menu -->
        <mat-nav-list class="sidebar-menu">
          <a mat-list-item routerLink="/overview" routerLinkActive="active" class="menu-item">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Overview</span>
          </a>
          <a mat-list-item routerLink="/lights" routerLinkActive="active" class="menu-item">
            <mat-icon matListItemIcon>lightbulb</mat-icon>
            <span matListItemTitle>Lights</span>
          </a>
          <a mat-list-item routerLink="/about" routerLinkActive="active" class="menu-item">
            <mat-icon matListItemIcon>info</mat-icon>
            <span matListItemTitle>About</span>
          </a>
        </mat-nav-list>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="avatar">RS</div>
            <div class="user-details">
              <span class="user-name">RS School</span>
              <span class="user-role">Angular</span>
            </div>
          </div>
        </div>
      </mat-sidenav>

      <!-- Main Content Area -->
      <mat-sidenav-content class="main-content">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidebar-container {
        height: 100vh;
        width: 100%;
      }

      .sidebar {
        width: 280px;
        background-color: #1e1e1e;
        color: white;
        transition: width 0.3s ease;
      }

      .sidebar-collapsed {
        width: 64px;
      }

      .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid #333;
      }

      .sidebar-title {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
      }

      .toggle-button {
        color: white;
      }

      .sidebar-menu {
        padding: 16px 0;
      }

      .menu-item {
        color: #ccc;
        transition: background-color 0.2s ease;
      }

      .menu-item:hover {
        background-color: #333;
      }

      .menu-item.active {
        background-color: #1976d2;
        color: white;
      }

      .sidebar-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 16px;
        border-top: 1px solid #333;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #1976d2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
      }

      .user-details {
        display: flex;
        flex-direction: column;
      }

      .user-name {
        font-size: 14px;
        font-weight: 500;
      }

      .user-role {
        font-size: 12px;
        color: #ccc;
      }

      .main-content {
        background-color: #f5f5f5;
        padding: 20px;
      }

      @media (max-width: 768px) {
        .sidebar {
          width: 100%;
        }

        .sidebar-collapsed {
          width: 64px;
        }
      }
    `,
  ],
})
export class SidebarComponent {
  isExpanded = input<boolean>(true);
  sidebarToggle = output<void>();

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}
