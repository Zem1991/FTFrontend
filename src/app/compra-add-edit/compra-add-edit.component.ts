import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-compra-add-edit',
  templateUrl: './compra-add-edit.component.html',
  styleUrls: ['./compra-add-edit.component.scss']
})
export class CompraAddEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _service: CompraService, 
    private _dialogRef: MatDialogRef<CompraAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.form = this._fb.group({
      dataHora: null,
      valorTotal: 0,
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
            alert('Compra atualizada.');
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
            alert('Compra criada.');
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
