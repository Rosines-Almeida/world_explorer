import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
 
@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],  
  template: `
    <div class="info-card" [class]="'theme-' + theme">
      <div class="info-icon">
        <mat-icon>{{ icon }}</mat-icon>
      </div>
      <h3>{{ title }}</h3>
      <p>{{ value || 'N/A' }}</p>
    </div>
  `,
  styleUrls: ['./info-card.scss']
})
export class InfoCardComponent {
  @Input() icon!: string; 
  @Input() title!: string;
  @Input() value?: string | number | null;
  @Input() theme: 'default' | 'primary' | 'secondary' = 'default';
 
}