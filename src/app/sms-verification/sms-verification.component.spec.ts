import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsVerificationComponent } from './sms-verification.component';

describe('SmsVerificationComponent', () => {
  let component: SmsVerificationComponent;
  let fixture: ComponentFixture<SmsVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmsVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
