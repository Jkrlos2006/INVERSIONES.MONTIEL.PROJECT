import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroegresoComponent } from './registroegreso.component';

describe('RegistroegresoComponent', () => {
  let component: RegistroegresoComponent;
  let fixture: ComponentFixture<RegistroegresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroegresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
