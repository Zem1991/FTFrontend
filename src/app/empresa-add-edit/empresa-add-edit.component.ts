import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-empresa-add-edit',
  templateUrl: './empresa-add-edit.component.html',
  styleUrls: ['./empresa-add-edit.component.scss']
})
export class EmpresaAddEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _service: EmpresaService, 
    private _dialogRef: MatDialogRef<EmpresaAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.form = this._fb.group({
      nome: '',
      cnpj: 0,
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  onFormSubmit(){
    if (this.form.valid){
      // console.log(this.form.value);
      if (this.data){
        this._service.update(this.data.id, this.form.value)
        .subscribe({
          next: (res: any) => {
            alert('Empresa atualizada.');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        });
      }
      else{
        this._service.add(this.form.value)
        .subscribe({
          next: (res: any) => {
            alert('Empresa criada.');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        });
      }
    }
  }
}
