import { Component, OnInit } from "@angular/core";
import { HttpServiceService } from "../services/http-service.service";
import { UserServiceService } from "../services/user-service.service";
import { User, CatalogItem } from "../models";
import { filter } from "rxjs/operators";
import { Observable } from "rxjs";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  constructor(
    private httpService: HttpServiceService,
    private userService: UserServiceService
  ) {}
  private activeUser: User;
  private newCartItem = [];
  private isLoadOver = false;
  ngOnInit() {
    this.activeUser = this.userService.getUserData();
    if( this.activeUser.newCartItems){
    this.activeUser.newCartItems.forEach(item => {
      this.httpService.getById(item).subscribe(itemCart => {
        this.newCartItem.push(itemCart);
      });
      this.isLoadOver = true;
    });}
  }
}
