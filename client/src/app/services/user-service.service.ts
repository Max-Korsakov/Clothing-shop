import { Injectable } from "@angular/core";
import { User } from "../models";
import { from, of, Observable, BehaviorSubject } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";
import { HttpServiceService } from "../services/http-service.service";
@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  public foo = new BehaviorSubject(undefined);

  private _activeUser: any = {
    id: null,
    email: null,
    password: null,
    firstName: null,
    newCartItems: [],
    cartItems: [],
    favoriteItems: []
  };
  public filterData;

  constructor(
    private authService: AuthServiceService,
    private httpService: HttpServiceService
  ) {
    this.foo.next(this._activeUser);
  }

  public addItemToCart(item): any {
    if (!this.authService.isAuth()) {
      this._activeUser.newCartItems = [
        ...this._activeUser.newCartItems,
        ...[item]
      ];
      this.foo.next(this._activeUser);
    } else {
      this.httpService
        .addCartItem(this._activeUser.id, item)
        .subscribe(data => {
          this._activeUser.cartItems = data;

          this.foo.next(this._activeUser);
        });
    }
  }

  public addItemFromNewCartItemsToCartItems(): any {
    if (this._activeUser.id && this._activeUser.newCartItems.length > 0) {
      this._activeUser.newCartItems.forEach(element => {
        this.httpService
          .addCartItem(this._activeUser.id, element)
          .subscribe(data => {
            this._activeUser.cartItems = data;
            this._activeUser.newCartItems = [];
            this.foo.next(this._activeUser);
          });
      });
    }
  }

  public deleteNewItemFromCart(itemId, itemSize, itemColor): any {
    const deletedIndex = this._activeUser.newCartItems.findIndex(element => {
      if (
        element.itemId === itemId &&
        element.itemSize === itemSize &&
        element.itemColor === itemColor
      ) {
        return element;
      }
    });
    this._activeUser.newCartItems.splice(deletedIndex, 1);
    this.foo.next(this._activeUser);
  }

  public deleteSavedItemFromCart(itemId, itemSize, itemColor): any {
    if (this._activeUser.id) {
      this._activeUser.cartItems.splice(
        this._activeUser.cartItems.indexOf(itemId),
        1
      );
      const deletedIndex = this._activeUser.cartItems.findIndex(element => {
        if (
          element.itemId === itemId &&
          element.itemSize === itemSize &&
          element.itemColor === itemColor
        ) {
          return element;
        }
      });

      this.httpService
        .deleteCartItem(this._activeUser.id, {
          itemId: itemId,
          itemSize: itemSize,
          itemColor: itemColor
        })
        .subscribe(data => {
          this._activeUser.cartItems = data;
          this.foo.next(this._activeUser);
        });
    } else {
      this._activeUser.cartItems.splice(
        this._activeUser.cartItems.indexOf(itemId),
        1
      );
      this.foo.next(this._activeUser);
    }
  }

  public addItemToFavorite(item) {}

  public setActiveUser() {
    if (localStorage.getItem("auth-token")) {
      this._activeUser.id = this.authService.decode().id;
      this._activeUser.email = this.authService.decode().email;
      this._activeUser.password = this.authService.decode().password;
      this._activeUser.firstName = this.authService.decode().firstName;
      this.httpService.getCartItems(this._activeUser.id).subscribe(data => {
        this._activeUser.cartItems = data;
        this.foo.next(this._activeUser);
      });
    } else {
      this.foo.next(this._activeUser);
    }
  }

  public getCartItems() {
    return this._activeUser.cartItems;
  }

  public setFilterProps(filterProps) {
    this.filterData = filterProps;
  }

  public getFilterProps() {
    if (this.filterData) {
      return this.filterData;
    }
  }

  public getUserData(): User {
    return this._activeUser;
  }

  public logOut() {
    this._activeUser.id = null;
    this._activeUser.email = null;
    this._activeUser.password = null;
    this._activeUser.firstName = null;
    this._activeUser.cartItems = [];
    this.foo.next(this._activeUser);
  }
}
