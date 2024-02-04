import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AifeedbackComponent } from './aifeedback.component';

describe('AifeedbackComponent', () => {
  let component: AifeedbackComponent;
  let fixture: ComponentFixture<AifeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AifeedbackComponent]
    });
    fixture = TestBed.createComponent(AifeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
