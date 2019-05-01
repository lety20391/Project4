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
        path: 'details/:id',
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

      {
        path: 'listCategory',
        component: ListCategoryComponent,
        data: {
          title: 'category list',
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
        path: 'edit',
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
        path: 'orders',
        component: OrderComponent,
        data: {
          title: 'Orders',
          urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Orders' }]
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
        path: 'products',
        component: ProductComponent,
        data: {
          title: 'Products',
          urls: [
            { title: 'Dashboard', url: '/dashboard' },
            { title: 'Products' }
          ]
        }
      }
    ]
  }
];
