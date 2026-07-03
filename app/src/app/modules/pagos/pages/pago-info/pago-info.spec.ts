import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoInfo } from './pago-info';

describe('PagoInfo', () => {
  let component: PagoInfo;
  let fixture: ComponentFixture<PagoInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(PagoInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
