import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() errorMessage: string = '';
  @Output() closeErrorMessage = new EventEmitter<void>();

  closeErrorMessagePopup(){
    this.closeErrorMessage.emit();
  }
}
