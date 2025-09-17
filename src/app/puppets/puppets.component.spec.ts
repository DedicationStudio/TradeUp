import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuppetsComponent } from './puppets.component';

describe('PuppetsComponent', () => {
  let component: PuppetsComponent;
  let fixture: ComponentFixture<PuppetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuppetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuppetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
