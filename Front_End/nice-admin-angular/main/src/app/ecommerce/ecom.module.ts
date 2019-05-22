import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
import { AddProductComponent } from './add-product/add-product.component';
import { ListPetComponent } from './list-pet/list-pet.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { UpdatePetComponent } from './update-pet/update-pet.component';
import { DetailPetComponent } from './detail-pet/detail-pet.component';
import { SmartTableLabelComponent } from './smart-table-label/smart-table-label.component';
import { CateComponent } from './cate/cate.component';
import { ListProductComponent } from './list-product/list-product.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FilePickerModule } from  'ngx-awesome-uploader';
import { SmartTableProImgComponent } from './smart-table-pro-img/smart-table-pro-img.component';
import { BDtableComponent } from '../UI/BDTable/BDtable.component';
import { PetTableComponent } from './pet-table/pet-table.component';
import { SmartTablePetImgComponent } from './smart-table-pet-img/smart-table-pet-img.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EcomRoutes),
    FormsModule,
    NgbModule,
    Ng2SmartTableModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FilePickerModule
  ],
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
    AddCateComponent,
    AddProductComponent,
    ListPetComponent,
    AddPetComponent,
    UpdatePetComponent,
    DetailPetComponent,
    BDtableComponent,
    SmartTableLabelComponent,
    CateComponent,
    ListProductComponent,
    SmartTableProImgComponent,
    PetTableComponent,
    SmartTablePetImgComponent,
    AdminComponent

  ],
  exports: [
    SmartTableLabelComponent,
    SmartTableProImgComponent,
    SmartTablePetImgComponent
  ],
  entryComponents: [
    SmartTableLabelComponent,
    SmartTableProImgComponent,
    SmartTablePetImgComponent
  ]
})
export class EcomModule {}
export {SmartTableLabelComponent}
