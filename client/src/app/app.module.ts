import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { FavouritComponent } from './favourit/favourit.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { SignupSigninDialogComponent } from './signup-signin-dialog/signup-signin-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { LoaderComponent } from './loader/loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSliderModule} from '@angular/material/slider';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    CartComponent,
    FavouritComponent,
    SearchComponent,
    ProductComponent,
    SiteLayoutComponent,
    NotFoundPageComponent,
    MaterialDialogComponent,
    SignupSigninDialogComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatSliderModule
  ],
  entryComponents: [MaterialDialogComponent, SignupSigninDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
