import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaegresoComponent } from './listaegreso.component';

describe('ListaegresoComponent', () => {
  let component: ListaegresoComponent;
  let fixture: ComponentFixture<ListaegresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaegresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
