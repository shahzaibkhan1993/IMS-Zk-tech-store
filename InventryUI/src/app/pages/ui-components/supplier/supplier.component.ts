import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Supplier } from 'src/app/_interface/inventory/supplier';
import { ErrorModalComponent } from 'src/app/shared/modals/error-modal/error-modal.component';
import { SuccessModalComponent } from 'src/app/shared/modals/success-modal/success-modal.component';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RepositoryErrorHandlerService } from 'src/app/shared/services/repository-error-handler.service';
import { RepositoryService } from 'src/app/shared/services/repository.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
})
export class SupplierComponent implements OnInit {
  public displayedColumns = ['name', 'contactInfo', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Supplier>();
  public errorMessage: string = '';
  public bsModalRef?: BsModalRef;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private repoService: RepositoryService,
    private errorService: RepositoryErrorHandlerService,
    private router: Router,
    private dialogService: DialogService,
    private modal: BsModalService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getAllSuppliers();
  }

  public getAllSuppliers = () => {
    this.repoService.getData('api/suppliers').subscribe(
      (res) => {
        this.dataSource.data = res as Supplier[];
      },
      (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      }
    );
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  public redirectToUpdate = (id: string) => {
    this.router.navigate([`/ui-components/update-supplier/${id}`]);
  };

  public deleteSupplier = (id: string) => {
    if (this.authService.isUserAdmin()) {
      this.dialogService
        .openConfirmDialog('Are you sure you want to delete this supplier?')
        .afterClosed()
        .subscribe((res) => {
          if (res) {
            const deleteUri: string = `api/suppliers/${id}`;
            this.repoService.delete(deleteUri).subscribe(() => {
              const config: ModalOptions = {
                initialState: {
                  modalHeaderText: 'Success Message',
                  modalBodyText: `Supplier deleted successfully`,
                  okButtonText: 'OK',
                },
              };

              this.bsModalRef = this.modal.show(SuccessModalComponent, config);
              this.bsModalRef.content.redirectOnOk.subscribe(() =>
                this.getAllSuppliers()
              );
            });
          }
        });
    } else {
      const config: ModalOptions = {
        initialState: {
          modalHeaderText: 'Error Message',
          modalBodyText: 'Only Admin allowed',
          okButtonText: 'OK',
        },
      };
      this.modal.show(ErrorModalComponent, config);
    }
  };
}
