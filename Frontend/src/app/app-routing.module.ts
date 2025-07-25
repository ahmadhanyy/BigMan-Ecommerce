import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { MembershipsComponent } from './Components/memberships/memberships.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { CoachesComponent } from './Components/coaches/coaches.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CoachDetailsComponent } from './Components/coach-details/coach-details.component';
import { AuthGuard } from './Guards/auth.guard';
import { AccountComponent } from './Components/account/account.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { VouchersComponent } from './Components/vouchers/vouchers.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { AdminOrderComponent } from './AdminComponents/admin-order/admin-order.component';
import { AdminProductComponent } from './AdminComponents/admin-product/admin-product.component';
import { AdminCoachComponent } from './AdminComponents/admin-coach/admin-coach.component';
import { AdminUserComponent } from './AdminComponents/admin-user/admin-user.component';
import { AdminMessageComponent } from './AdminComponents/admin-message/admin-message.component';
import { AdminVoucherComponent } from './AdminComponents/admin-voucher/admin-voucher.component';
import { AdminCategoryComponent } from './AdminComponents/admin-category/admin-category.component';
import { AdminMembershipComponent } from './AdminComponents/admin-membership/admin-membership.component';
import { AdminBranchComponent } from './AdminComponents/admin-branch/admin-branch.component';
import { AdminHomeComponent } from './AdminComponents/admin-home/admin-home.component';
import { AdminSearchComponent } from './AdminComponents/admin-search/admin-search.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'}, //Default route
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:category', component: ProductsComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'search/:query', component: SearchResultsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'branches', component: BranchesComponent},
  {path: 'memberships', component: MembershipsComponent},
  {path: 'coaches', component: CoachesComponent},
  {path: 'coach/:id', component: CoachDetailsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'wishlist', component: WishListComponent},
  {path: 'inbox', component: InboxComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'vouchers', component: VouchersComponent},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'adminHome', component: AdminHomeComponent},
  {path: 'adminOrders', component: AdminOrderComponent},
  {path: 'adminProducts', component: AdminProductComponent},
  {path: 'adminCoaches', component: AdminCoachComponent},
  {path: 'adminUsers', component: AdminUserComponent},
  {path: 'adminBranches', component: AdminBranchComponent},
  {path: 'adminMessages', component: AdminMessageComponent},
  {path: 'adminVouchers', component: AdminVoucherComponent},
  {path: 'adminCategories', component: AdminCategoryComponent},
  {path: 'adminMemberships', component: AdminMembershipComponent},
  {path: 'adminSearch/:query', component: AdminSearchComponent},
  {path: '**', component: PageNotFoundComponent} //Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
