import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarClave } from './recuperar-clave';

describe('RecuperarClave', () => {
  let component: RecuperarClave;
  let fixture: ComponentFixture<RecuperarClave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarClave],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarClave);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
