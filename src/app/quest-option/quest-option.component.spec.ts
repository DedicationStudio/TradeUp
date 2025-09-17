import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestOptionComponent } from './quest-option.component';

describe('QuestOptionComponent', () => {
  let component: QuestOptionComponent;
  let fixture: ComponentFixture<QuestOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
