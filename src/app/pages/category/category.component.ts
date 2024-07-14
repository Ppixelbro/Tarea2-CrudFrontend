import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ICategory } from '../../interfaces';
import { ModalComponent } from '../../components/modal/modal.component';
import { CategoryListComponent } from '../../components/category/category-list/category-list.component';
import { CategoryFormComponent } from '../../components/category/category-form/category-form.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ ModalComponent, CategoryListComponent, CategoryFormComponent, LoaderComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent{
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: NgbModal = inject(NgbModal);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public areActionsAvailable: boolean = false;

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.categoryService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  onFormEventCalled (params: ICategory) {
    this.categoryService.save(params);
    this.modalService.dismissAll();
  }
}
