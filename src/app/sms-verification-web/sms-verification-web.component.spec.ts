import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsVerificationWebComponent } from './sms-verification-web.component';

describe('SmsVerificationWebComponent', () => {
  let component: SmsVerificationWebComponent;
  let fixture: ComponentFixture<SmsVerificationWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmsVerificationWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmsVerificationWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
