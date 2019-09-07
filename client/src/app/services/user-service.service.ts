import { Injectable } from "@angular/core";
import { User } from "../models";
import { from, of, Observable } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";
import { HttpServiceService } from "../services/http-service.service";
@Injectable({
  providedIn: "root"
})
export class UserServiceService {
  public _activeUser: User = {
    id: null,
    email: null,
    password: null,
    firstName: null,
    newCartItems: [],
    cartItems: [],
    favoriteItems: []
  };

  constructor(
    private authService: AuthServiceService,
    private httpService: HttpServiceService
  ) {}

  public addItemToCart(item): any {
    this._activeUser.newCartItems.push(item.itemId);
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
      return this._activeUser ;
    } else {
      return this._activeUser;
    }
  }

  public getUserData(): User {
    if (this._activeUser) {
      return this._activeUser;
    }
  }
}
