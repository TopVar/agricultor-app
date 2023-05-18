import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionParcialidadesComponent } from './gestion-parcialidades.component';

describe('GestionParcialidadesComponent', () => {
  let component: GestionParcialidadesComponent;
  let fixture: ComponentFixture<GestionParcialidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionParcialidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionParcialidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
