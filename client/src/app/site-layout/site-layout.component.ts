import { Component, OnInit } from "@angular/core";
import { PopupServiceService } from "../services/popup-service.service";
import { User } from "../models";
import { FilterService } from "../services/filter.service";
import { CatalogItem } from "../models";
import { AuthServiceService } from "../services/auth-service.service";
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
@Component({
  selector: "app-site-layout",
  templateUrl: "./site-layout.component.html",
  styleUrls: ["./site-layout.component.scss"]
})
export class SiteLayoutComponent implements OnInit {
  constructor(
    private popupService: PopupServiceService,
    private filterService: FilterService,
    private authService: AuthServiceService
  ) {}
  public viewItemsArray: any;
  public activeUser: User = null;

  public message: string = "User was created";
  public actionButtonLabel: string = "Ok";
  public action: boolean = false;
  public setAutoHide: boolean = true;
  public autoHide: number = 1500;
  public horizontalPosition: MatSnackBarHorizontalPosition = "left";
  public verticalPosition: MatSnackBarVerticalPosition = "bottom";
  ngOnInit() {
    this.setActiveUser();
  }

  public setActiveUser() {
    if (localStorage.getItem("auth-token")) {
      this.activeUser = this.authService.decode();
    } else {
      this.activeUser = null;
    }
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
      if (data.isSignUp) {
        this.authService.register(data.formValue).subscribe(
          data => {
            this.openSnackBar(this.message);
          },
          error => {
            console.log(error.error.message);
          }
        );
      } else {
        this.authService.login(data.formValue).subscribe(
          () => {
            console.log(data);
            this.activeUser = this.authService.decode();
            this.openSnackBar("Hello, " + this.activeUser.firstName);
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
    this.activeUser = null;
  }
}
