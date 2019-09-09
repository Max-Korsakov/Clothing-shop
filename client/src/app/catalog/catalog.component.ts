import { Component, OnInit } from "@angular/core";
import { CatalogItem } from "../models";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserServiceService } from "../services/user-service.service";
import { FilterService } from "../services/filter.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { NgModel} from '@angular/forms';
import { HttpServiceService } from "../services/http-service.service";
import {
  MatSnackBar,
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


  ) {}
  message: string = " was added to cart";
  actionButtonLabel: string = "Ok";
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 1500;
  horizontalPosition: MatSnackBarHorizontalPosition = "left";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  public gender: any
  public brand: any
  public type: any
  public color: any
  public size: any
  public minPrice: any
  public maxPrice: any

  public catalog: any;
  public selectedProperties: any ={}
  public properties: any = {
    brand: ['All'],
    type: ['All'],
    color: ['All'],
    gender: ['All'],
    size: ['All']
  };
  ngOnInit() {
    this.httpService.getItems().subscribe(data => {
      this.catalog = data.items;
      this.properties.gender = [...this.properties.gender, ...data.filterProps.filterGender];
      this.properties.brand = [...this.properties.brand, ...data.filterProps.filterBrands];
      this.properties.type = [...this.properties.type, ...data.filterProps.filterTypes];
      this.properties.color = [...this.properties.color, ...data.filterProps.filterColors];
      this.properties.size = [...this.properties.size, ...data.filterProps.filterSizes];

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
    this.userService.addItemToCart({
      itemId: id
    });
    this.openSnackBar(itemName + this.message);
  }

  public filterItems(gender,brand,type,color,size,maxPrice) {
if(!gender && !brand && !type && !color && !size &&!maxPrice) {
  this.openSnackBar('Choose filter conditions');
} else {
   this.httpService.getFilteredItems({gender: gender,brand: brand,type: type,color: color,size: size,maxPrice: maxPrice}).subscribe( data =>{
    this.catalog = data})}
   
  }

  public addToFavorite(id) {
    this.userService.addItemToFavorite(id);
  }

  public openItemDetails(id) {
    this.router.navigate(["/catalog/" + id]);
  }
}
