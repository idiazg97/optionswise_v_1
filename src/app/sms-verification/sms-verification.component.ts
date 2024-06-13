import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PhoneServiceService, PhoneArea } from '../phone-service.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


export interface SMSVerStatus {
  popUpClose: boolean;
  smsVerified: boolean;
}

@Component({
  selector: 'app-sms-verification',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sms-verification.component.html',
  styleUrl: './sms-verification.component.css'
})
export class SmsVerificationComponent {
  verificationForm: FormGroup;
  verificationCode: string[] = ['', '', '', '', '', ''];
  phoneNumberAreas: PhoneArea[]
  // recaptchaVerifier?: RecaptchaVerifier;
  // confirmationResult?: ConfirmationResult;
  recaptchaVerified: boolean = false;
  @Output() messageEmitter = new EventEmitter<SMSVerStatus>()
  @Input() phoneNumber?: string

  constructor(private formBuilder: FormBuilder, private phoneService: PhoneServiceService) {
    this.phoneNumberAreas = this.phoneService.getPhoneNumbers()
    this.verificationForm = this.formBuilder.group({
      digit1: ['', [Validators.required, Validators.maxLength(1)]],
      digit2: ['', [Validators.required, Validators.maxLength(1)]],
      digit3: ['', [Validators.required, Validators.maxLength(1)]],
      digit4: ['', [Validators.required, Validators.maxLength(1)]],
      digit5: ['', [Validators.required, Validators.maxLength(1)]],
      digit6: ['', [Validators.required, Validators.maxLength(1)]],
    });
  }

  ngOnInit(): void {
    // this.loadRecaptchaVerifier()
  }

  ngAfterViewInit(): void {
    // this.requestVerificationCode()
  }

  ngOnDestroy(): void {
    // this.recaptchaVerifier = undefined
  }

  onKeyUp(event: any, nextInputId: string, previousInputId: string): void {
    const input = event.target;
    const value = input.value;
    const key = event.key;
  
    // Clear the input if it's not a number and not empty (to allow backspace/delete to work)
    if (value && !value.match(/[0-9]/)) {
      input.value = '';
      // Do not attempt to move focus if the input is invalid
      return;
    }
  
    // Focus next field if a number is entered and a next field exists
    if (value && key !== 'Backspace' && key !== 'Delete' && nextInputId !== input.id) {
      const nextInput = document.getElementById(nextInputId);
      nextInput?.focus();
    } 
    // Focus previous field if Backspace/Delete is pressed, current field is empty, and a previous field exists
    else if ((key === 'Backspace' || key === 'Delete') && !value && previousInputId) {
      const previousInput = document.getElementById(previousInputId);
      previousInput?.focus();
    }
  }
  
  

  onSubmit(): void {
    // Here you would typically gather the form data and use it
    // for example, sending it to a backend service to verify the SMS code
    if (this.verificationForm.valid) {
      const verificationCode = Object.values(this.verificationForm.value).join('');
      // this.verifyCode(verificationCode)
      console.log('Submitted Verification Code:', verificationCode);
      // Add your logic to handle the verification code submission
    }
  }

  // async requestVerificationCode(): Promise<void> {
  //   if (this.recaptchaVerifier) {
  //     console.log("CHECK", this.phoneNumber)
  //     if (this.phoneNumber) {
  //       await this.phoneService.signUp(this.phoneNumber, this.recaptchaVerifier).then((res) => {
  //         console.log("KIKI", res)
  //         this.confirmationResult = res
  //       })
  //     }
  //   }
  // }

  // async verifyCode(code: string) {
  //   await this.confirmationResult?.confirm(`${code}`).then((res) => {
  //     console.log("JUICE", res)
  //     if (res) {
  //       this.closeWindow(true)
  //     }
  //   }).catch(e => {
  //     alert("Wrong Code")
  //     console.log("EErr", e)
  //   })
  // }

  // loadRecaptchaVerifier(): void {
  //   // Make sure this method is idempotent or checks if the verifier already exists
  //   this.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
  //     'size': 'normal',
  //     'callback': (response: any) => {
  //       console.log(response)
  //       // Callback code here
  //       const container = document.getElementById('recaptcha-container');
  //       if (container) {
  //         container.style.display = 'none'; // Hides the container
  //         // Alternatively, to remove the element from DOM: container.remove();
  //       }
  //       this.recaptchaVerified =  true

  //     }
  //   }, this.auth);

  //   this.recaptchaVerifier.render().then((widgetId) => {
  //     // Store widgetId if needed for later
  //   }).catch((error) => {
  //     console.error('Error rendering ReCAPTCHA', error);
  //   });
  // }

  closeWindow(verified: boolean) {
    this.messageEmitter.emit({popUpClose: false, smsVerified: verified})
  }
}
