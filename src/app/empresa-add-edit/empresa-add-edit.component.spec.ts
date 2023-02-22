import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaAddEditComponent } from './empresa-add-edit.component';

describe('EmpresaAddEditComponent', () => {
  let component: EmpresaAddEditComponent;
  let fixture: ComponentFixture<EmpresaAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresaAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
