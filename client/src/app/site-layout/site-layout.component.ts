import { Component, OnInit } from "@angular/core";
import { PopupServiceService } from "../services/popup-service.service";
import { User } from "../models";

import { CatalogItem } from "../models";
import { AuthServiceService } from "../services/auth-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UserServiceService } from "../services/user-service.service";
import { Observable, Subscription } from "rxjs";
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import { HttpServiceService } from "../services/http-service.service";
@Component({
  selector: "app-site-layout",
  templateUrl: "./site-layout.component.html",
  styleUrls: ["./site-layout.component.scss"]
})
export class SiteLayoutComponent implements OnInit {
  id: string;
  constructor(
    private popupService: PopupServiceService,
  
    private authService: AuthServiceService,
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private httpService: HttpServiceService
  ) {
    this.id = route.snapshot.params["id"];
  }
  public viewItemsArray: any;
  public activeUser: User = null;
  public message: string = "User was created";
  public actionButtonLabel: string = "Ok";
  public action: boolean = false;
  public setAutoHide: boolean = true;
  public autoHide: number = 1500;
  public horizontalPosition: MatSnackBarHorizontalPosition = "left";
  public verticalPosition: MatSnackBarVerticalPosition = "bottom";
  public searchData;
public searchBrands;
public searchTypes;
  public numberItemsInTheCart: number = null;
  ngOnInit() {
    this.userService.setActiveUser();
    this.activeUser = this.userService.getUserData();
  //  if(this.activeUser && this.activeUser.id) {
  //    this.userService.getCartItems(this.activeUser.id)
  //  }
  
    this.userService.foo.subscribe( data => {  
      this.numberItemsInTheCart = data.cartItems.length + data.newCartItems.length;
    })
  }

 

  public openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    this.popupService.openSnackBar(message, config);
  }

  public openSignUpDialog(): void {
    this.popupService.openSignUpDialog().subscribe(data => {
      if (data && data.isSignUp) {
        this.authService.register(data.formValue).subscribe(
          registerData => {
            this.openSnackBar(this.message);
            this.authService.login(data.formValue).subscribe(
              () => {
                this.userService.setActiveUser();
                this.openSnackBar(
                  "Hello, " + this.activeUser.firstName
                );
         
              },
              error => {
                console.log(error.error.message);
              }
            );
          },
          error => {
            console.log(error.error.message);
          }
        );
      } else if (data) {
        this.authService.login(data.formValue).subscribe(
          () => {
            this.userService.setActiveUser();
            this.openSnackBar(
              "Hello, " + this.activeUser.firstName
            );
     
          },
          error => {
            console.log(error.error.message);
          }
        );
      }
    });
  }

  public inputChanged() {
    if(/\S/.test(this.searchData)) {
    this.httpService.searchItems(this.searchData.trim()).subscribe( data => {
      this.searchBrands = data.brand
      this.searchTypes = data.type
    })}
  }

  public findBrandItems(brand) {
    this.httpService.getItemsWithParams({brand:brand }, {pageSize:8})
    this.searchData = null
  }

  public findTypeItems(type) {
    this.httpService.getItemsWithParams({type:type }, {pageSize:8})
    this.searchData = null
  }

  public logOut() {
    this.authService.logout();

    this.userService.logOut()
  }
}
