import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsHowComponent } from './analytics-how.component';

describe('AnalyticsHowComponent', () => {
  let component: AnalyticsHowComponent;
  let fixture: ComponentFixture<AnalyticsHowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsHowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsHowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
