import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpresaService } from '../services/empresa.service';
import { EmpresaAddEditComponent } from '../empresa-add-edit/empresa-add-edit.component';

@Component({
  selector: 'app-empresa-list',
  templateUrl: './empresa-list.component.html',
  styleUrls: ['./empresa-list.component.scss']
})
export class EmpresaListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cnpj', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _service: EmpresaService){}

  ngOnInit(): void {
      this.getList();
  }

  getList(){
    this._service.getList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        alert(err);
      }
    });
  }

  update(data: any){
    const dialogRef = this._dialog.open(EmpresaAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res){
          this.getList();
        }
      }
    });
  }

  delete(id: number){
    this._service.delete(id).subscribe({
      next: (res: any) => {
        alert('Empresa deletada.');
        this.getList();
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
