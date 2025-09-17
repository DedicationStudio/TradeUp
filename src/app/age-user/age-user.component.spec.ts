import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeUserComponent } from './age-user.component';

describe('AgeUserComponent', () => {
  let component: AgeUserComponent;
  let fixture: ComponentFixture<AgeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
