import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EcomRoutes } from './ecom.routing';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { OrderComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CateDetailComponent } from './cate-detail/cate-detail.component';
import { UpdateCateComponent } from './update-cate/update-cate.component';
import { AddCateComponent } from './add-cate/add-cate.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(EcomRoutes), FormsModule, NgbModule],
  declarations: [
    CartComponent,
    CheckoutComponent,
    DetailsComponent,
    EditComponent,
    OrderComponent,
    ProductComponent,
    UpdateProductComponent,
    ListCategoryComponent,
    CateDetailComponent,
    UpdateCateComponent,
    AddCateComponent
  ]
})
export class EcomModule {}
