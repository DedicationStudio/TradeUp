import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelIconComponent } from './level-icon.component';

describe('LevelIconComponent', () => {
  let component: LevelIconComponent;
  let fixture: ComponentFixture<LevelIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LevelIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
