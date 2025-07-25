import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { ImageCarouselComponent } from './Components/image-carousel/image-carousel.component';
import { ProductsComponent } from './Components/products/products.component';
import { MembershipsComponent } from './Components/memberships/memberships.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { CartComponent } from './Components/cart/cart.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CoachesComponent } from './Components/coaches/coaches.component';
import { ProductsListViewComponent } from './Components/products-list-view/products-list-view.component';
import { ProductsGridViewComponent } from './Components/products-grid-view/products-grid-view.component';
import { CoachesListViewComponent } from './Components/coaches-list-view/coaches-list-view.component';
import { CoachesGridViewComponent } from './Components/coaches-grid-view/coaches-grid-view.component';
import { ProductsSidebarComponent } from './Components/products-sidebar/products-sidebar.component';
import { CoachesSidebarComponent } from './Components/coaches-sidebar/coaches-sidebar.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { StarRatingComponent } from './Components/star-rating/star-rating.component';
import { LoadButtonComponent } from './Components/load-button/load-button.component';
import { ProductModalComponent } from './Components/product-modal/product-modal.component';
import { CoachModalComponent } from './Components/coach-modal/coach-modal.component';
import { CategoriesButtonComponent } from './Components/categories-button/categories-button.component';
import { HorizontalScrollDirective } from './Directives/horizontal-scroll.directive';
import { ProductGridCardComponent } from './Components/product-grid-card/product-grid-card.component';
import { ProductListCardComponent } from './Components/product-list-card/product-list-card.component';
import { CoachGridCardComponent } from './Components/coach-grid-card/coach-grid-card.component';
import { CoachListCardComponent } from './Components/coach-list-card/coach-list-card.component';
import { ProductCarouselComponent } from './Components/product-carousel/product-carousel.component';
import { CoachCarouselComponent } from './Components/coach-carousel/coach-carousel.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginModalComponent } from './Components/login-modal/login-modal.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { CoachDetailsComponent } from './Components/coach-details/coach-details.component';
import { RegisterModalComponent } from './Components/register-modal/register-modal.component';
import { LogoutDialogComponent } from './Components/logout-dialog/logout-dialog.component';
import { AccountComponent } from './Components/account/account.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { InboxComponent } from './Components/inbox/inbox.component';
import { VouchersComponent } from './Components/vouchers/vouchers.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { AddressModalComponent } from './Components/address-modal/address-modal.component';
import { OrderPlacedModalComponent } from './Components/order-placed-modal/order-placed-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { VerifyModalComponent } from './Components/verify-modal/verify-modal.component';
import { SearchResultsComponent } from './Components/search-results/search-results.component';
import { AdminBranchComponent } from './AdminComponents/admin-branch/admin-branch.component';
import { AdminCategoryComponent } from './AdminComponents/admin-category/admin-category.component';
import { AdminCoachComponent } from './AdminComponents/admin-coach/admin-coach.component';
import { AdminFooterComponent } from './AdminComponents/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './AdminComponents/admin-header/admin-header.component';
import { AdminHomeComponent } from './AdminComponents/admin-home/admin-home.component';
import { AdminLogoutComponent } from './AdminComponents/admin-logout/admin-logout.component';
import { AdminMembershipComponent } from './AdminComponents/admin-membership/admin-membership.component';
import { AdminMessageComponent } from './AdminComponents/admin-message/admin-message.component';
import { AdminNavbarComponent } from './AdminComponents/admin-navbar/admin-navbar.component';
import { AdminOrderComponent } from './AdminComponents/admin-order/admin-order.component';
import { AdminProductComponent } from './AdminComponents/admin-product/admin-product.component';
import { AdminUserComponent } from './AdminComponents/admin-user/admin-user.component';
import { AdminVoucherComponent } from './AdminComponents/admin-voucher/admin-voucher.component';
import { ProdListCardComponent } from './AdminComponents/prod-list-card/prod-list-card.component';
import { CoachesListCardComponent } from './AdminComponents/coaches-list-card/coaches-list-card.component';
import { CardSkeletonComponent } from './Components/card-skeleton/card-skeleton.component';
import { ListSkeletonComponent } from './Components/list-skeleton/list-skeleton.component';
import { AdminSearchComponent } from './AdminComponents/admin-search/admin-search.component';
import { BranchListCardComponent } from './AdminComponents/branch-list-card/branch-list-card.component';
import { CategoryListCardComponent } from './AdminComponents/category-list-card/category-list-card.component';
import { MembershipListCardComponent } from './AdminComponents/membership-list-card/membership-list-card.component';
import { MessageListCardComponent } from './AdminComponents/message-list-card/message-list-card.component';
import { OrderListCardComponent } from './AdminComponents/order-list-card/order-list-card.component';
import { UserListCardComponent } from './AdminComponents/user-list-card/user-list-card.component';
import { VoucherListCardComponent } from './AdminComponents/voucher-list-card/voucher-list-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ImageCarouselComponent,
    ProductsComponent,
    MembershipsComponent,
    BranchesComponent,
    CartComponent,
    NavbarComponent,
    CoachesComponent,
    ProductsListViewComponent,
    ProductsGridViewComponent,
    CoachesListViewComponent,
    CoachesGridViewComponent,
    ProductsSidebarComponent,
    CoachesSidebarComponent,
    WishListComponent,
    StarRatingComponent,
    LoadButtonComponent,
    ProductModalComponent,
    CoachModalComponent,
    CategoriesButtonComponent,
    HorizontalScrollDirective,
    ProductGridCardComponent,
    ProductListCardComponent,
    CoachGridCardComponent,
    CoachListCardComponent,
    ProductCarouselComponent,
    CoachCarouselComponent,
    PageNotFoundComponent,
    LoginModalComponent,
    ProductDetailsComponent,
    CoachDetailsComponent,
    RegisterModalComponent,
    LogoutDialogComponent,
    AccountComponent,
    OrdersComponent,
    InboxComponent,
    VouchersComponent,
    PaymentComponent,
    AddressModalComponent,
    OrderPlacedModalComponent,
    VerifyModalComponent,
    SearchResultsComponent,
    AdminBranchComponent,
    AdminCategoryComponent,
    AdminCoachComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    AdminHomeComponent,
    AdminLogoutComponent,
    AdminMembershipComponent,
    AdminMessageComponent,
    AdminNavbarComponent,
    AdminOrderComponent,
    AdminProductComponent,
    AdminUserComponent,
    AdminVoucherComponent,
    ProdListCardComponent,
    CardSkeletonComponent,
    ListSkeletonComponent,
    AdminSearchComponent,
    CoachesListCardComponent,
    BranchListCardComponent,
    CategoryListCardComponent,
    MembershipListCardComponent,
    MessageListCardComponent,
    OrderListCardComponent,
    UserListCardComponent,
    VoucherListCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
    ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
