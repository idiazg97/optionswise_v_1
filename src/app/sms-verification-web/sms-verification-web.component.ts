import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PhoneServiceService, PhoneArea } from '../phone-service.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { environment } from '../../../src/environments/environments';

export interface SMSVerStatus {
  popUpClose: boolean;
  smsVerified: boolean;
}

@Component({
  selector: 'app-sms-verification-web',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sms-verification-web.component.html',
  styleUrls: ['./sms-verification-web.component.css']
})

export class SmsVerificationWebComponent implements OnInit, AfterViewInit, OnDestroy {
  verificationForm: FormGroup;
  verificationCode: string[] = ['', '', '', '', '', ''];
  phoneNumberAreas: PhoneArea[];
  recaptchaVerifier!: RecaptchaVerifier;
  confirmationResult?: ConfirmationResult;
  recaptchaVerified: boolean = false;
  @Output() messageEmitter = new EventEmitter<SMSVerStatus>();
  @Input() phoneNumber?: string;

  constructor(private formBuilder: FormBuilder, private phoneService: PhoneServiceService) {
    this.phoneNumberAreas = this.phoneService.getPhoneNumbers();
    this.verificationForm = this.formBuilder.group({
      digit1: ['', [Validators.required, Validators.maxLength(1)]],
      digit2: ['', [Validators.required, Validators.maxLength(1)]],
      digit3: ['', [Validators.required, Validators.maxLength(1)]],
      digit4: ['', [Validators.required, Validators.maxLength(1)]],
      digit5: ['', [Validators.required, Validators.maxLength(1)]],
      digit6: ['', [Validators.required, Validators.maxLength(1)]],
    });

    // Initialize Firebase
    initializeApp(environment.firebase);
  }

  ngOnInit(): void {
    this.loadRecaptchaVerifier();
  }

  ngAfterViewInit(): void {
    this.recaptchaVerifier.render().then((widgetId) => {
      console.log('Recaptcha rendered with widget ID:', widgetId);
    }).catch((error) => {
      console.error('Error rendering reCAPTCHA:', error);
    });
  }

  ngOnDestroy(): void {

  }

  onKeyUp(event: any, nextInputId: string, previousInputId: string): void {
    const input = event.target;
    const value = input.value;
    const key = event.key;

    if (value && !value.match(/[0-9]/)) {
      input.value = '';
      return;
    }

    if (value && key !== 'Backspace' && key !== 'Delete' && nextInputId !== input.id) {
      const nextInput = document.getElementById(nextInputId);
      nextInput?.focus();
    } else if ((key === 'Backspace' || key === 'Delete') && !value && previousInputId) {
      const previousInput = document.getElementById(previousInputId);
      previousInput?.focus();
    }
  }

  onSubmit(): void {
    if (this.verificationForm.valid) {
      const verificationCode = Object.values(this.verificationForm.value).join('');
      this.verifyCode(verificationCode);
      console.log('Submitted Verification Code:', verificationCode);
    }
  }

  async requestVerificationCode(): Promise<void> {
    const auth = getAuth();
    if (this.recaptchaVerifier) {
      if (this.phoneNumber) {
        try {
          this.confirmationResult = await signInWithPhoneNumber(auth, this.phoneNumber, this.recaptchaVerifier);
          console.log("Confirmation result:", this.confirmationResult);
          this.recaptchaVerified = true; // Set recaptchaVerified to true when request is successful
        } catch (error) {
          console.error("Error during sign-in with phone number:", error);
        }
      }
    }
  }

  async verifyCode(code: string): Promise<void> {
    try {
      if (this.confirmationResult) {
        await this.confirmationResult.confirm(code);
        this.closeWindow(true);
      }
    } catch (error) {
      alert("Wrong Code");
      console.error("Error verifying code:", error);
    }
  }

  loadRecaptchaVerifier(): void {
    const auth = getAuth();
    const container = document.getElementById('recaptcha-container');
    this.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'normal',
      callback: (response: any) => {
        setTimeout(()=> {
          this.requestVerificationCode().then(() => {
            this.recaptchaVerified = true; // Set recaptchaVerified to true when reCAPTCHA is solved
            this.recaptchaVerifier.clear();
          })
        }, 1000)
      }
    });

    this.recaptchaVerifier.render().then((widgetId) => {
      console.log('Recaptcha rendered with widget ID:', widgetId);
    }).catch((error) => {
      console.error('Error rendering reCAPTCHA:', error);
    });
  }

  closeWindow(verified: boolean): void {
    this.messageEmitter.emit({ popUpClose: false, smsVerified: verified });
  }
}
