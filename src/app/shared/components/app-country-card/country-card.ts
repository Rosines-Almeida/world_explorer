import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CountryModel } from '../../../core/models/country.model';
import { CommonModule } from '@angular/common';
import { Button } from "../button/button";
  

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.html',
  styleUrls: ['./country-card.scss'],
  imports: [CommonModule, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryCardComponent {
  @Input() country!: CountryModel;
  @Output() viewDetails = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  public isExiting = false; 

  public onViewDetails(event: Event, code: string) {
    event.stopPropagation();
    this.viewDetails.emit(code);
  }

  public onDelete(event: Event, code: string) {
    event.stopPropagation();
     this.isExiting = true;  
    setTimeout(() => {
      this.delete.emit(code);
    }, 400);
  }

  public onCardClick() {
    if (!this.isExiting) {  
      this.viewDetails.emit(this.country.cca3);
    }
  }

}
