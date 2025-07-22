import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiedComponent } from './pied.component';

describe('PiedComponent', () => {
  let component: PiedComponent;
  let fixture: ComponentFixture<PiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
