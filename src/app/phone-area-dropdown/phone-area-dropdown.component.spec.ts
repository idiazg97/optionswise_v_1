import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAreaDropdownComponent } from './phone-area-dropdown.component';

describe('PhoneAreaDropdownComponent', () => {
  let component: PhoneAreaDropdownComponent;
  let fixture: ComponentFixture<PhoneAreaDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneAreaDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneAreaDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
