import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpInputWebComponent } from './sign-up-input-web.component';

describe('SignUpInputWebComponent', () => {
  let component: SignUpInputWebComponent;
  let fixture: ComponentFixture<SignUpInputWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpInputWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpInputWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
