import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextQuestComponent } from './next-quest.component';

describe('NextQuestComponent', () => {
  let component: NextQuestComponent;
  let fixture: ComponentFixture<NextQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextQuestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
