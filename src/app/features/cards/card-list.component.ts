import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Card } from '../../core/models/dashboard.interface';
import { CardComponent } from './card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, CardComponent],
  template: `
    <div class="card-list">
      @for (card of cards(); track card.id) {
        <app-card
          [card]="card"
          [tabId]="tabId()"
          (cardToggle)="onCardToggle($event)"
          (deviceToggle)="onDeviceToggle($event)"
        >
        </app-card>
      }
    </div>
  `,
  styles: [
    `
      .card-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
        padding: 0;
      }

      @media (max-width: 768px) {
        .card-list {
          grid-template-columns: 1fr;
          gap: 12px;
        }
      }

      @media (min-width: 1200px) {
        .card-list {
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }
      }
    `,
  ],
})
export class CardListComponent {
  cards = input.required<Card[]>();
  tabId = input.required<string>();
  cardToggle = output<{ cardId: string; newState: boolean }>();
  deviceToggle = output<{ cardId: string; deviceIndex: number; newState: boolean }>();

  onCardToggle(event: { cardId: string; newState: boolean }): void {
    this.cardToggle.emit(event);
  }

  onDeviceToggle(event: { cardId: string; deviceIndex: number; newState: boolean }): void {
    this.deviceToggle.emit(event);
  }
}
