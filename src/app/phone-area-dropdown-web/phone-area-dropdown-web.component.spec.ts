import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAreaDropdownWebComponent } from './phone-area-dropdown-web.component';

describe('PhoneAreaDropdownWebComponent', () => {
  let component: PhoneAreaDropdownWebComponent;
  let fixture: ComponentFixture<PhoneAreaDropdownWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneAreaDropdownWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneAreaDropdownWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
