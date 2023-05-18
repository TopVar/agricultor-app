import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTransportistaComponent } from './agregar-transportista.component';

describe('AgregarTransportistaComponent', () => {
  let component: AgregarTransportistaComponent;
  let fixture: ComponentFixture<AgregarTransportistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTransportistaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTransportistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
