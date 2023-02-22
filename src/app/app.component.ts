import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaAddEditComponent } from './empresa-add-edit/empresa-add-edit.component';
import { EmpresaService } from './services/empresa.service';
import { ProdutoAddEditComponent } from './produto-add-edit/produto-add-edit.component';
import { CompraAddEditComponent } from './compra-add-edit/compra-add-edit.component';
import { ProdutoService } from './services/produto.service';
import { CompraService } from './services/compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FTFrontend';

  constructor(
    private _dialog: MatDialog, 
    private _empresaService: EmpresaService,
    private _produtoService: ProdutoService,
    private _compraService: CompraService,
  ){}

  ngOnInit(): void {
    // this.getEmpresaList();
  }

  openEmpresaAddEdit(){
    const dialogRef = this._dialog.open(EmpresaAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res){
          this._empresaService.getList();
        }
      }
    });
  }

  openProdutoAddEdit(){
    const dialogRef = this._dialog.open(ProdutoAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res){
          this._produtoService.getList();
        }
      }
    });
  }

  openCompraAddEdit(){
    const dialogRef = this._dialog.open(CompraAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res){
          this._compraService.getList();
        }
      }
    });
  }
}
