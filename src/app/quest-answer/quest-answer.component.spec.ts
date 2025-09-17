import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestAnswerComponent } from './quest-answer.component';

describe('QuestAnswerComponent', () => {
  let component: QuestAnswerComponent;
  let fixture: ComponentFixture<QuestAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
