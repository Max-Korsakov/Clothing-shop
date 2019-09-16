import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpServiceService } from "../services/http-service.service";
import { UserServiceService } from "../services/user-service.service";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private httpService: HttpServiceService,
    private userService: UserServiceService
  ) {}
  private activeUser: any;
  private newCartItem = [];
  private cartItems = [];
  public allCartItems = [];
  public displayedColumns: string[] = [
    "Brand",
    "Name",
    "Color",
    "Size",
    "Price"
  ];
  ngOnInit() {
    this.userService.foo.subscribe(data => {
      this.activeUser = data;
      this.getDataToCreateTable();
    });
  }

  public getDataToCreateTable() {
    this.newCartItem.splice(this.newCartItem[0], this.newCartItem.length);
    this.cartItems.splice(this.cartItems[0], this.cartItems.length);

    const newIdArray = this.activeUser.newCartItems.map(item => {
      return item.itemId;
    });

    this.httpService.getCartItemsObjects(newIdArray).subscribe(itemsArray => {
      this.activeUser.newCartItems.forEach(savedItem => {
        const itemObject = itemsArray.find(item => {
          return item._id === savedItem.itemId;
        });
        if (itemObject && itemObject.hasOwnProperty("_id")) {
          const itemInTable = Object.assign({}, itemObject);
          itemInTable.size = savedItem.itemSize;
          itemInTable.color = savedItem.itemColor;
          this.newCartItem = [...this.newCartItem, ...[itemInTable]];
        }
      });
    });

    const idArray = this.activeUser.cartItems.map(item => {
      return item.itemId;
    });

    this.httpService.getCartItemsObjects(idArray).subscribe(itemsArray => {
      this.activeUser.cartItems.forEach(savedItem => {
        const itemObject = itemsArray.find(item => {
          return item._id === savedItem.itemId;
        });
        if (itemObject && itemObject.hasOwnProperty("_id")) {
          const itemInTable = Object.assign({}, itemObject);
          itemInTable.size = savedItem.itemSize;
          itemInTable.color = savedItem.itemColor;
          this.cartItems = [...this.cartItems, ...[itemInTable]];
        }
      });
    });
  }

  getTotalCostNewItems() {
    return this.newCartItem
      .map(t => t.price)
      .reduce((acc, value) => acc + value, 0);
  }

  getTotalCostItems() {
    return this.cartItems
      .map(t => t.price)
      .reduce((acc, value) => acc + value, 0);
  }

  public deleteNewItemFromCart(id, size, color) {
    this.userService.deleteNewItemFromCart(id, size, color);
  }

  public deleteSavedItemFromCart(id, size, color) {
    this.userService.deleteSavedItemFromCart(id, size, color);
  }
  saveNewItems() {
    this.userService.addItemFromNewCartItemsToCartItems();
  }
  ngOnDestroy() {
    this.saveNewItems();
  }
}
