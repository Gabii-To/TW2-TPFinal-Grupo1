import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPerfil } from './usuario-perfil';

describe('UsuarioPerfil', () => {
  let component: UsuarioPerfil;
  let fixture: ComponentFixture<UsuarioPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuarioPerfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
