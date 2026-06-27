import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCrear } from './producto-crear';

describe('ProductoCrear', () => {
  let component: ProductoCrear;
  let fixture: ComponentFixture<ProductoCrear>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoCrear],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoCrear);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
