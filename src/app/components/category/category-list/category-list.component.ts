import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../../../services/category.service';
import { ICategory } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ CommonModule, ModalComponent, CategoryFormComponent ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() itemList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;

  public selectedItem: ICategory = {};
  private categoryService = inject(CategoryService);
  public modalService = inject(NgbModal);
  public authService: AuthService = inject(AuthService);
  
  ngOnInit(): void {
    this.authService.getUserAuthorities();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['areActionsAvailable']) {
      console.log('areActionsAvailable', this.areActionsAvailable);
    }
  }

  showDetailModal(item: ICategory, modal:any) {
    this.selectedItem = {...item};
    modal.show(); 
  }

  onFormEventCalled (params: ICategory) {
    this.categoryService.update(params);
    this.modalService.dismissAll();
  }

  deleteCategory(category: ICategory) {
    this.categoryService.delete(category);
  }
}
