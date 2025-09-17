import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsGoalComponent } from './analytics-goal.component';

describe('AnalyticsGoalComponent', () => {
  let component: AnalyticsGoalComponent;
  let fixture: ComponentFixture<AnalyticsGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
