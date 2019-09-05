import { Component, OnInit } from "@angular/core";
import { CatalogItem } from "../models";
import { UserServiceService } from "../services/user-service.service";
import { FilterService } from "../services/filter.service";
import { Observable, Subscription } from "rxjs";
import { HttpServiceService } from "../services/http-service.service";
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import {PopupServiceService } from '../services/popup-service.service'
@Component({
  selector: "app-catalog",
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.scss"]
})
export class CatalogComponent implements OnInit {
  constructor(
    private userService: UserServiceService,
    private filterService: FilterService,
    private httpService: HttpServiceService,
    private popupService: PopupServiceService
  ) {}
  message: string = " was added to cart";
  actionButtonLabel: string = "Ok";
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 1500;
  horizontalPosition: MatSnackBarHorizontalPosition = "left";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  public catalog: any;
  
  ngOnInit() {
    this.httpService.getItems().subscribe(data => {
      this.catalog = data;
    });
  }

  public openSnackBar(message: string) {
   
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    this.popupService.openSnackBar(message,config)


  }

  public addToCart(id, itemSize, itemColor) {
    this.userService.addItemToCart({
      itemId: id,
      itemSize: itemSize,
      itemColor: itemColor
    });
  }

  public filterItems() {
    this.catalog = this.filterService.filterItems(this.catalog);
  }

  public addToFavorite(id) {
    this.userService.addItemToFavorite(id);
  }
}
