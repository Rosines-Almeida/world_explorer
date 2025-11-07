import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../../shared/components/button/button';
import { MapModel } from '../../core/models/country.model';
 
@Component({
  selector: 'app-location',
  imports: [Button, CommonModule, MatIconModule],
  templateUrl: './location.html',
  styleUrl: './location.scss',
})
export class Location {
  @Input() maps: MapModel | undefined;

  public openGoogleMaps(url?: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
