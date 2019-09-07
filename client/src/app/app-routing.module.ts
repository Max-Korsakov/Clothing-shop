import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { FavouritComponent } from './favourit/favourit.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', redirectTo: '/catalog', pathMatch: 'full' },
      { path: 'catalog', component: CatalogComponent},
       {path: 'catalog/:id', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'favorite',
        component: FavouritComponent,
        canActivate: [AuthGuard]
      },
      { path: 'search', component: SearchComponent },
     
    ]
  },
  {
    path: '**',
    component: SiteLayoutComponent,
    children: [{ path: '**', component: NotFoundPageComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
