import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroAnimationWebComponent } from './intro-animation-web.component';

describe('IntroAnimationWebComponent', () => {
  let component: IntroAnimationWebComponent;
  let fixture: ComponentFixture<IntroAnimationWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroAnimationWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroAnimationWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
