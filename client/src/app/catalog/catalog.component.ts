import { Component, OnInit, ViewChild } from "@angular/core";
import { CatalogItem } from "../models";

import { UserServiceService } from "../services/user-service.service";
import { FilterService } from "../services/filter.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthServiceService } from "../services/auth-service.service";
import { HttpServiceService } from "../services/http-service.service";
import {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
import { PopupServiceService } from "../services/popup-service.service";
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
    private popupService: PopupServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService
  ) {}
  message: string = " was added to cart";
  actionButtonLabel: string = "Ok";
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 1500;
  horizontalPosition: MatSnackBarHorizontalPosition = "left";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  public userId;
  public gender: any;
  public brand: any;
  public type: any;
  public color: any;
  public size: any;
  public minPrice: any;
  public maxPrice: any = 300;
  public panelOpenState = false;
  public catalog: any;
  public selectedProperties: any = {};
  public catalogLength: number;
  public pageSize: number = 8;
  public properties: any = {
    brand: ["All"],
    type: ["All"],
    color: ["All"],
    gender: ["All"],
    size: ["All"]
  };
  @ViewChild("paginator", null) paginator: any;
  ngOnInit() {
    this.userService.foo.subscribe(data => {
      this.userId = data.id;
    });
    this.httpService.getFilterProps().subscribe(data => {
      this.properties.gender = [
        ...this.properties.gender,
        ...data.filterProps.filterGender
      ];
      this.properties.brand = [
        ...this.properties.brand,
        ...data.filterProps.filterBrands
      ];
      this.properties.type = [
        ...this.properties.type,
        ...data.filterProps.filterTypes
      ];
      this.properties.color = [
        ...this.properties.color,
        ...data.filterProps.filterColors
      ];
      this.properties.size = [
        ...this.properties.size,
        ...data.filterProps.filterSizes
      ];
    });

    this.getItemsWithParams({ pageSize: this.pageSize });
    this.httpService.catalogUpdate.subscribe(data => {
      if (data) {
        this.catalog = data.items;
        this.brand = data.filterData.brand;
        this.type = data.filterData.type;
        this.catalogLength = data.itemArrayLength;
      }
    });
  }

  public openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    this.popupService.openSnackBar(message, config);
  }

  public addToCart(id, itemSize, itemColor, itemName) {
    if (!itemSize) {
      this.openSnackBar("Choose size, please");
    } else if (!itemColor) {
      this.openSnackBar("Choose size, please");
    } else {
      this.userService.addItemToCart({
        itemId: id,
        itemSize: itemSize,
        itemColor: itemColor
      });
      this.openSnackBar(itemName + this.message);
    }
  }

  public filterItems() {
    this.getItemsWithParams({ pageSize: this.pageSize });
    this.paginator.firstPage();
  }

  public paginationClick(event) {
    this.getItemsWithParams(event);
  }

  public getItemsWithParams(paginationData) {
    this.pageSize = paginationData.pageSize;
    this.httpService.getItemsWithParams(
      {
        gender: this.gender,
        brand: this.brand,
        type: this.type,
        color: this.color,
        size: this.size,
        maxPrice: this.maxPrice
      },

      paginationData
    );
  }

  public addToFavorite(id) {
    if (!this.authService.isAuth()) {
      this.popupService.openSignUpDialog();
    } else {
      this.userService.addItemToFavorite(id);
    }
  }

  public openItemDetails(id) {
    this.router.navigate(["/catalog/" + id]);
  }
}
