import { Component, OnInit } from "@angular/core";
import { CatalogItem } from "../models";
import { HttpServiceService } from "../services/http-service.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { PopupServiceService } from "../services/popup-service.service";
import { UserServiceService } from "../services/user-service.service";
import {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
 
  public catalogItem: CatalogItem;
  constructor(
    private httpService: HttpServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserServiceService,
    private popupService: PopupServiceService
  ) {}
  userFavorite;
  message: string = " was added to cart";
  actionButtonLabel: string = "Ok";
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 1500;
  horizontalPosition: MatSnackBarHorizontalPosition = "left";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  ngOnInit() {
    this.userService.foo.subscribe(data => {
    
      this.userFavorite = data.favoriteItems
    });
    this.route.params.subscribe((params: Params) => {
      this.httpService.getById(params.id).subscribe(data => {
        this.catalogItem = data;
      });
    });
  }

  public openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    this.popupService.openSnackBar(message, config);
  }

  public backToCatalog() {
    this.router.navigate(["/catalog"]);
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
  public addToFavorite(id) {
    if(!this.userFavorite.find(element => {
      if(element === id) {
        return true;
      } 
    })) {
      this.userService.addItemToFavorite(id);
this.openSnackBar('Item was added to favorite')
  } else  {
    this.openSnackBar('Item already in favorite')
  }
  }
}
