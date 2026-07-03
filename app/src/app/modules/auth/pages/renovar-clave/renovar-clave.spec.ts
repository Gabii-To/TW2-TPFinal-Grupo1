import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovarClave } from './renovar-clave';

describe('RenovarClave', () => {
  let component: RenovarClave;
  let fixture: ComponentFixture<RenovarClave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovarClave],
    }).compileComponents();

    fixture = TestBed.createComponent(RenovarClave);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
