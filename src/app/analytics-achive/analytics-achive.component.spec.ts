import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAchiveComponent } from './analytics-achive.component';

describe('AnalyticsAchiveComponent', () => {
  let component: AnalyticsAchiveComponent;
  let fixture: ComponentFixture<AnalyticsAchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsAchiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsAchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
