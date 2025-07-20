import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  isExpanded = input<boolean>(true);
  sidebarToggle = output<void>();

  ngOnInit(): void {
    // Ensure proper initialization
    console.log('Sidebar component initialized');
  }

  toggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}
