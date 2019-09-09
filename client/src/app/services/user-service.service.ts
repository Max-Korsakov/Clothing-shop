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

  private _activeUser: User = {
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
    this._activeUser.newCartItems.push(item.itemId);
    this.foo.next(this._activeUser); 
  }

  public addItemToFavorite(item) {
    this._activeUser.favoriteItems.push(item);
 
  }

  public setActiveUser() {
    if (localStorage.getItem("auth-token")) {
      this._activeUser.id = this.authService.decode().id;
      this._activeUser.email = this.authService.decode().email;
      this._activeUser.password = this.authService.decode().password;
      this._activeUser.firstName = this.authService.decode().firstName;
      this.foo.next(this._activeUser); 
      return this._activeUser ;
    } else {
      this.foo.next(this._activeUser); 
      return this._activeUser;
    }
  }

  public setCartItems(cartItems) {
    if (localStorage.getItem("auth-token")) {
      this._activeUser.cartItems = cartItems;  
      this.foo.next(this._activeUser); 
      return this._activeUser ;
    } 
  }

  public setFilterProps(filterProps) {
    this.filterData = filterProps
  }

  public getFilterProps () {
    if(this.filterData) {
    return this.filterData }
  }

  public getUserData(): User {
    if (this._activeUser) {
      return this._activeUser;
    }
  }
}
