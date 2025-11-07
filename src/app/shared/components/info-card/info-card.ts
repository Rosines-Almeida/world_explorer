import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
 
@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],  
  templateUrl: './info-card.html',
  styleUrls: ['./info-card.scss']
})
export class InfoCardComponent {
  @Input() icon!: string; 
  @Input() title!: string;
  @Input() value?: string | number | null;
  @Input() theme: 'default' | 'primary' | 'secondary' = 'default';
 
}