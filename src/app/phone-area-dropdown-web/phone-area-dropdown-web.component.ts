import { Component, Output, EventEmitter } from '@angular/core';
import { PhoneArea, PhoneServiceService } from '../phone-service.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-phone-area-dropdown-web',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './phone-area-dropdown-web.component.html',
  styleUrl: './phone-area-dropdown-web.component.css'
})
export class PhoneAreaDropdownWebComponent {
  selectedCountry: PhoneArea;
  countries: PhoneArea[];
  showDropdown: boolean = false;
  @Output() messageEvent = new EventEmitter<PhoneArea>();

  constructor(private phoneService: PhoneServiceService) {
    // Set a default selected country if needed
    this.selectedCountry = this.phoneService.phoneNumbers[0];
    this.countries = phoneService.getPhoneNumbers()
  }

  onSelect(country: PhoneArea): void {
    this.selectedCountry = country;
    this.showDropdown = false;
    this.sendMessageToParent()
  }

  sendMessageToParent() {
    this.messageEvent.emit(this.selectedCountry)
  }
}
