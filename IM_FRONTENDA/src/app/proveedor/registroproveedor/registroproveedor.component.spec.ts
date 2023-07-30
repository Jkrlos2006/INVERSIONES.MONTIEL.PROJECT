import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroproveedorComponent } from './registroproveedor.component';

describe('RegistroproveedorComponent', () => {
  let component: RegistroproveedorComponent;
  let fixture: ComponentFixture<RegistroproveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroproveedorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
