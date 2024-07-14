import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProduct } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'products';
  private itemListSignal = signal<IProduct[]>([]);
  private snackBar = inject(MatSnackBar);

  get items$() {
    return this.itemListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        response.reverse();
        this.itemListSignal.set(response);
      },
      error: (error : any) => {
        console.log('error', error);
      }
    });
  }

  public save(item: IProduct) {
    item = {
      ...item,
      category: {
        id: Number(item.category)
      }
    }
    this.add(item).subscribe({
      next: (response: any) => {
        this.itemListSignal.update((products: IProduct[]) => [response, ...products]);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
      }
    })
  } 

  public update(item: IProduct) {
    item = {
      ...item,
      category: {
        id: Number(item.category)
      }
    }
    this.edit(item.id, item).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().map(product => product.id === item.id ? item : product);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
      }
    })
  }

  public delete(product: IProduct) {
    this.del(product.id).subscribe({
      next: () => {
        const updatedItems = this.itemListSignal().filter((g: IProduct) => g.id != product.id);
        this.itemListSignal.set(updatedItems);
      },
      error: (error : any) => {
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('error', error);
      }
    })
  }
}
