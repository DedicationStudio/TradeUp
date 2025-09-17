import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsFromComponent } from './analytics-from.component';

describe('AnalyticsFromComponent', () => {
  let component: AnalyticsFromComponent;
  let fixture: ComponentFixture<AnalyticsFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
