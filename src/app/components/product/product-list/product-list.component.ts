import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ICategory, IProduct } from '../../../interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ModalComponent, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent{
  @Input() itemList: IProduct[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedItem: IProduct = {};
  private productService = inject(ProductService);
  public authService: AuthService = inject(AuthService);
  public modalService = inject(NgbModal);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemList']) {
      this.loadList();
    }
  }

  loadList() {
    this.productService.getAll();
  }

  showDetailModal(item: IProduct, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: IProduct) {
    this.productService.update(params);
    this.modalService.dismissAll();
  }

  deleteProduct(product: IProduct) {
    this.productService.delete(product);
  }
}
