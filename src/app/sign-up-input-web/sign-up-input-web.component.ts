import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PhoneAreaDropdownComponent } from '../phone-area-dropdown/phone-area-dropdown.component';
import { PhoneAreaDropdownWebComponent } from "../phone-area-dropdown-web/phone-area-dropdown-web.component";

export interface PhoneNumber {
  number: string;
  status: boolean;
}

@Component({
  selector: 'app-sign-up-input-web',
  standalone: true,
  imports: [CommonModule, FormsModule, PhoneAreaDropdownComponent, PhoneAreaDropdownWebComponent],
  templateUrl: './sign-up-input-web.component.html',
  styleUrl: './sign-up-input-web.component.css'
})
export class SignUpInputWebComponent {
  phoneNumber: string = '';
  phoneArea: string = '+1';
  private userInputWithoutAreaCode: string = ''; // To store user input without the area code
  @Output() popupMessageEvent = new EventEmitter<PhoneNumber>()

  constructor() {
    // Initialize Firebase app only if it hasn't been initialized yet
    // if (!getApps().length) {
    //   console.log("WHA", getApps())
    //   initializeApp(firebaseConfig);
    //   console.log("WHA2", getApps())
    // }
  }

  onInputChange(value: any) {
    // Remove non-digit characters and area code from the input
    let numericInput = value.replace(/[^\d]/g, '');

    // If the input starts with the current area code digits, strip them to avoid duplication
    const areaCodeDigits = this.phoneArea.replace(/[^\d]/g, '');
    if (numericInput.startsWith(areaCodeDigits)) {
      numericInput = numericInput.substring(areaCodeDigits.length);
    }

    // Update only if the value changes to avoid unnecessary processing
    if (this.userInputWithoutAreaCode !== numericInput) {
      this.userInputWithoutAreaCode = numericInput;
      this.updatePhoneNumber();
    }
  }

  receiveMessage($event: { code: string }) {
    this.phoneArea = $event.code;
    this.updatePhoneNumber(); // Update phoneNumber whenever the area code changes
  }

  private updatePhoneNumber() {
    // Ensure that only the user inputted number is appended to the new area code
    this.phoneNumber = `${this.phoneArea} ${this.userInputWithoutAreaCode}`;
  }

  sendMessage() {    
    this.popupMessageEvent.emit({number: this.phoneNumber, status: true});
  }
}
