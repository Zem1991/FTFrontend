import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraAddEditComponent } from './compra-add-edit.component';

describe('CompraAddEditComponent', () => {
  let component: CompraAddEditComponent;
  let fixture: ComponentFixture<CompraAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompraAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
