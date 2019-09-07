import { Component, OnInit } from "@angular/core";
import { PopupServiceService } from "../services/popup-service.service";
import { User } from "../models";
import { FilterService } from "../services/filter.service";
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
    private filterService: FilterService,
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

  public numberItemsInTheCart: number = null;
  ngOnInit() {
    this.userService.setActiveUser();
    this.activeUser = this.userService.getUserData();
    console.log(this.activeUser);
  }

  public filterCatalogItems(items: CatalogItem[]) {
    this.filterService.filterItems(items);
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
          data => {
            this.openSnackBar(this.message);
          },
          error => {
            console.log(error.error.message);
          }
        );
      } else if (data) {
        this.authService.login(data.formValue).subscribe(
          () => {
            this.userService.setActiveUser();
            this.activeUser = this.userService.getUserData();
            this.openSnackBar(
              "Hello, " + this.userService.getUserData().firstName
            );
            this.httpService
              .getCartItems(this.userService.getUserData().id)
              .subscribe(items => console.log(items));
          },
          error => {
            console.log(error.error.message);
          }
        );
      }
    });
  }

  public logOut() {
    this.authService.logout();
    this.activeUser.id = null;
    this.activeUser.email = null;
    this.activeUser.password = null;
    this.activeUser.firstName = null;
  }
}
