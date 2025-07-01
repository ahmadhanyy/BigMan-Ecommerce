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
  {path: '**', component: PageNotFoundComponent} //Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
