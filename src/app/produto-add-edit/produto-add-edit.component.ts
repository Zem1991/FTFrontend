import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto-add-edit',
  templateUrl: './produto-add-edit.component.html',
  styleUrls: ['./produto-add-edit.component.scss']
})
export class ProdutoAddEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _service: ProdutoService, 
    private _dialogRef: MatDialogRef<ProdutoAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.form = this._fb.group({
      nome: '',
      valor: 0,
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
            alert('Produto atualizado.');
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
            alert('Produto criado.');
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
