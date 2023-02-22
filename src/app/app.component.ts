import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpresaAddEditComponent } from './empresa-add-edit/empresa-add-edit.component';
import { EmpresaService } from './services/empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FTFrontend';

  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empresaService: EmpresaService){}

  ngOnInit(): void {
      this.getEmpresaList();
  }

  openEmpresaAddEdit(){
    const dialogRef = this._dialog.open(EmpresaAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res){
          this.getEmpresaList();
        }
      }
    });
  }

  getEmpresaList(){
    this._empresaService.getList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  editEmpresa(data: any){
    const dialogRef = this._dialog.open(EmpresaAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res){
          this.getEmpresaList();
        }
      }
    });
  }

  deleteEmpresa(id: number){
    this._empresaService.delete(id).subscribe({
      next: (res: any) => {
        alert('Empresa deletada.');
        this.getEmpresaList();
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
