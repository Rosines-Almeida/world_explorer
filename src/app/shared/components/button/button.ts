import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
@Input() variant: 'primary' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() fullWidth: boolean = false;
  @Output() onClick = new EventEmitter<Event>();

  onButtonClick(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
