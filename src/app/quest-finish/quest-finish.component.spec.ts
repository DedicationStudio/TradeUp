import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestFinishComponent } from './quest-finish.component';

describe('QuestFinishComponent', () => {
  let component: QuestFinishComponent;
  let fixture: ComponentFixture<QuestFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestFinishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
