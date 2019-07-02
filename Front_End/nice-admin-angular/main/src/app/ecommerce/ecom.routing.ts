import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { OrderComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import {UpdateProductComponent} from './update-product/update-product.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CateDetailComponent } from './cate-detail/cate-detail.component';
import {UpdateCateComponent} from './update-cate/update-cate.component';
import { AddCateComponent } from './add-cate/add-cate.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListPetComponent } from './list-pet/list-pet.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { UpdatePetComponent } from './update-pet/update-pet.component';
import { DetailPetComponent } from './detail-pet/detail-pet.component';
import {CateComponent} from './cate/cate.component';
import { ListProductComponent } from './list-product/list-product.component';
import { BDtableComponent } from '../UI/BDTable/BDtable.component';
import { PetTableComponent } from './pet-table/pet-table.component';
import { AdminComponent } from './admin/admin.component';

export const EcomRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cart',
        component: CartComponent,
        data: {
          title: 'Cart',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Cart' }]
        }
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        data: {
          title: 'Checkout',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Checkout' }
          ]
        }
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: {
          title: 'Admin',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Checkout' }
          ]
        }
      },
      {
        path: 'pendingBooking',
        component: BDtableComponent,
        data: {
          title: 'List Booking',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'List Booking' }
          ]
        }
      },
      // Product Category
      {
        path: 'products',
        component: ProductComponent,
        data: {
          title: 'Products',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Products' }
          ]
        }
      },
      {
        path: 'addProduct',
        component: AddProductComponent,
        data: {
          title: 'Add New Product',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Orders' }]
        }
      },
      {
        path: 'listProduct',
        component: ListProductComponent,
        data: {
          title: 'List Product',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'List Product' }]
        }
      },
      {
        path: 'detailProduct/:id',
        component: DetailsComponent,
        data: {
          title: 'Product Details',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Product Details' }
          ]
        }
      },
      {
        path: 'editProduct/:id',
        component: EditComponent,
        data: {
          title: 'Edit Product',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Edit Product' }
          ]
        }
      },
      {
        path: 'updateProduct/:id',
        component: UpdateProductComponent,
        data: {
          title: 'Product update',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Product Update' }
          ]
        }
      },

      {
        path: 'updateCategory/:id',
        component: UpdateCateComponent,
        data: {
          title: 'Cate update',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Cate Update' }
          ]
        }
      },
      // Product Category

       // Pet Category
       {
         path: 'petTable',
         component: PetTableComponent,
         data: {
           title: 'Pet list',
           urls: [
             { title: 'Dashboard', url: '/dashboard' },
             { title: 'category list' }
           ]
         }
       },
      {
        path: 'listPet',
        component: ListPetComponent,
        data: {
          title: 'Pet list',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'category list' }
          ]
        }
      },
      {
        path: 'addPet',
        component: AddPetComponent,
        data: {
          title: 'Add Pet',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'category list' }
          ]
        }
      },
      {
        path: 'detailPet/:id',
        component: DetailPetComponent,
        data: {
          title: 'Detail Pet',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'category list' }
          ]
        }
      },

      {
        path: 'updatePet/:id',
        component: UpdatePetComponent,
        data: {
          title: 'Update Pet',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'category list' }
          ]
        }
      },


      {
        path: 'category',
        component: CateComponent,
        data: {
          title: 'Category Management',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'category list' }
          ]
        }
      },

      {
        path: 'addCategory',
        component: AddCateComponent,
        data: {
          title: 'Add new Category',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'category list' }
          ]
        }
      },
      {
        path: 'detailCategory/:id',
        component: CateDetailComponent,
        data: {
          title: 'category list',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'category list' }
          ]
        }
      },
      {
        path: 'orders',
        component: OrderComponent,
        data: {
          title: 'Orders',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Orders' }]
        }
      }

    ]
  }
];
