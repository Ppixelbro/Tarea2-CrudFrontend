import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory, IProduct } from '../../../interfaces';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent{
  @Input() title: string = '';
  @Input() categoriesList: ICategory[] = [];
  @Input() toUpdateProduct: IProduct = {};
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  public categoryService = inject(CategoryService);

  ngOnInit(): void { 
    this.categoryService.getAll();
  }
  

  addEdit()  {
    this.callParentEvent.emit(this.toUpdateProduct);
  }
}
