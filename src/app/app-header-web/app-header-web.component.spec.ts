import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderWebComponent } from './app-header-web.component';

describe('AppHeaderWebComponent', () => {
  let component: AppHeaderWebComponent;
  let fixture: ComponentFixture<AppHeaderWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppHeaderWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
