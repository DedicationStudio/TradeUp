import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsExperienceComponent } from './analytics-experience.component';

describe('AnalyticsExperienceComponent', () => {
  let component: AnalyticsExperienceComponent;
  let fixture: ComponentFixture<AnalyticsExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsExperienceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
