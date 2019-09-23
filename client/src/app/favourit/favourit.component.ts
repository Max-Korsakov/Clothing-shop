import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserServiceService } from "../services/user-service.service";
import { HttpServiceService } from "../services/http-service.service";
import { PopupServiceService } from "../services/popup-service.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";
@Component({
  selector: "app-favourit",
  templateUrl: "./favourit.component.html",
  styleUrls: ["./favourit.component.scss"]
})
export class FavouritComponent implements OnInit, OnDestroy {
  constructor(
    public userService: UserServiceService,
    private popupService: PopupServiceService,
    public httpService: HttpServiceService,
    public router: Router,
    private route: ActivatedRoute
   
  ) {}
  public activeUser;
  public favoriteItems = [];
  message: string = " was added to cart";
  actionButtonLabel: string = "Ok";
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 1500;
  horizontalPosition: MatSnackBarHorizontalPosition = "left";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  ngOnInit() {
    this.userService.getFavorite();
    this.userService.foo.subscribe(data => {
      this.activeUser = data;
      this.checkLogIn()
      this.getDataToView();
    });
   
  
  
  }

  public getDataToView() {
    this.favoriteItems.splice(this.favoriteItems[0], this.favoriteItems.length);

    this.httpService
      .getCartItemsObjects(this.activeUser.favoriteItems)
      .subscribe(itemsArray => {
        this.activeUser.favoriteItems.forEach(itemId => {
          const itemObject = itemsArray.find(item => {
            return item._id === itemId;
          });
          if (itemObject && itemObject.hasOwnProperty("_id")) {
            const itemOnView = Object.assign({}, itemObject);
            this.favoriteItems = [...this.favoriteItems, ...[itemOnView]];
          }
        });
      });
  }

  public openItemDetails(id) {
    this.router.navigate(["/catalog/" + id]);
  }

  public deleteFromFavorite(id) {
    this.userService.deleteFromFavorite(id)
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

  checkLogIn() {
    if(!this.activeUser.id) {
      this.router.navigate(["/catalog/"]);
    }
  }

  ngOnDestroy() {
    this.favoriteItems = [];
  }
}
