import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestGraphComponent } from './quest-graph.component';

describe('QuestGraphComponent', () => {
  let component: QuestGraphComponent;
  let fixture: ComponentFixture<QuestGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
