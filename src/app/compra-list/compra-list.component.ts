import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompraService } from '../services/compra.service';
import { CompraAddEditComponent } from '../compra-add-edit/compra-add-edit.component';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.scss']
})
export class CompraListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dataHora', 'valorTotal', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _service: CompraService){}

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
    const dialogRef = this._dialog.open(CompraAddEditComponent, {
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
        alert('Compra deletada.');
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
