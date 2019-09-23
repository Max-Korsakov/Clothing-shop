import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from "@angular/core/testing";
import { Observable, Observer } from "rxjs";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatTableModule } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { DebugElement } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";

import { CartComponent } from "./cart.component";
import { HttpServiceService } from "../services/http-service.service";
import { UserServiceService } from "../services/user-service.service";
describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let de: DebugElement;
  let httpService: HttpServiceService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        MatTableModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [HttpServiceService, HttpClient],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    httpService = fixture.debugElement.injector.get(HttpServiceService);
    component = fixture.debugElement.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    component.newCartItem = [
      {
        id: "1",
        section: "clothes",
        type: "shirt",
        brand: "Zara",
        name: "Basic shirt",
        discription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        gender: "Man",
        color: ["Red"],
        size: ["XS", "M", "L"],
        img: "http://nowdeem.com/img/products/1531567492.jpg",
        price: 16,
        availability: true
      },
      {
        id: "2",
        section: "clothes",
        type: "shirt",
        brand: "Zara",
        name: "Basic shirt",
        discription: "This is best shirt ever",
        gender: "Man",
        color: ["Red"],
        size: ["M"],
        img:
          "https://static.zara.net/photos///2019/V/0/2/p/3057/429/615/2/w/560/3057429615_1_1_1.jpg?ts=1552666222871",
        price: 25,
        availability: true
      }
    ];
    component.cartItems = [
      {
        id: "1",
        section: "clothes",
        type: "shirt",
        brand: "Zara",
        name: "Basic shirt",
        discription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        gender: "Man",
        color: ["Red"],
        size: ["XS", "M", "L"],
        img: "http://nowdeem.com/img/products/1531567492.jpg",
        price: 16,
        availability: true
      },
      {
        id: "2",
        section: "clothes",
        type: "shirt",
        brand: "Zara",
        name: "Basic shirt",
        discription: "This is best shirt ever",
        gender: "Man",
        color: ["Red"],
        size: ["M"],
        img:
          "https://static.zara.net/photos///2019/V/0/2/p/3057/429/615/2/w/560/3057429615_1_1_1.jpg?ts=1552666222871",
        price: 25,
        availability: true
      }
    ];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return sum of new items prices", () => {
    let sum = component.getTotalCostNewItems();
    expect(sum).toBe(41);
  });

  it("should return sum of  items prices", () => {
    let sum = component.getTotalCostItems();
    expect(sum).toBe(41);
  });

  it("Should be created one table for new items and one table for saved items", done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let table = fixture.nativeElement.querySelectorAll("table");
      expect(table.length).toBe(2);
      done();
    });
  });

  it("should view data of newCartItem at the table ", done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableArray = [...fixture.nativeElement.querySelectorAll("table")];
      let newItemsTable = tableArray[0];
      let tableRows = newItemsTable.querySelectorAll("tr");
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe("Brand");
      expect(headerRow.cells[1].innerHTML).toBe("Name");
      expect(headerRow.cells[2].innerHTML).toBe("Color");
      expect(headerRow.cells[3].innerHTML).toBe("Size");
      expect(headerRow.cells[4].innerHTML).toBe("Price");
      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toBe("Zara");
      expect(row1.cells[1].innerHTML).toBe("Basic shirt");
      expect(row1.cells[2].innerHTML).toBe("Red");
      expect(row1.cells[3].innerHTML).toBe("XS,M,L");
      expect(row1.cells[4].innerHTML).toBe("16$");
      let row3 = tableRows[3];
      expect(row3.cells[0].innerHTML).toBe("Zara");
      expect(row3.cells[1].innerHTML).toBe("Basic shirt");
      expect(row3.cells[2].innerHTML).toBe("Red");
      expect(row3.cells[3].innerHTML).toBe("M");
      expect(row3.cells[4].innerHTML).toBe("25$");
      done();
    });
  });

  it("should view data of cartItems at the table ", done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const tableArray = [...fixture.nativeElement.querySelectorAll("table")];
      let cartItems = tableArray[1];
      let tableRows = cartItems.querySelectorAll("tr");
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe("Brand");
      expect(headerRow.cells[1].innerHTML).toBe("Name");
      expect(headerRow.cells[2].innerHTML).toBe("Color");
      expect(headerRow.cells[3].innerHTML).toBe("Size");
      expect(headerRow.cells[4].innerHTML).toBe("Price");
      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toBe("Zara");
      expect(row1.cells[1].innerHTML).toBe("Basic shirt");
      expect(row1.cells[2].innerHTML).toBe("Red");
      expect(row1.cells[3].innerHTML).toBe("XS,M,L");
      expect(row1.cells[4].innerHTML).toBe("16$");
      let row3 = tableRows[3];
      expect(row3.cells[0].innerHTML).toBe("Zara");
      expect(row3.cells[1].innerHTML).toBe("Basic shirt");
      expect(row3.cells[2].innerHTML).toBe("Red");
      expect(row3.cells[3].innerHTML).toBe("M");
      expect(row3.cells[4].innerHTML).toBe("25$");
      done();
    });
  });

  it("should create order information block", async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll("order-info")).toBeTruthy();
  }));

  it("should create a order button", async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll("order-info-buttom")).toBeTruthy();
  }));

  it("should get data to create tables", fakeAsync(() => {
    component.activeUser.newCartItems = [
      {
        itemId: "1",
        itemSize: "L",
        itemColor: "Red"
      }
    ];
    component.activeUser.cartItems = [
      {
        itemId: "2",
        itemSize: "M",
        itemColor: "Red"
      }
    ];
    const mockItemOne = [
      {
        _id: "1",
        section: "clothes",
        type: "shirt",
        brand: "Zara",
        name: "Basic shirt",
        discription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        gender: "Man",
        color: ["Red"],
        size: ["XS", "M", "L"],
        img: "http://nowdeem.com/img/products/1531567492.jpg",
        price: 16,
        availability: true
      }
    ];
    const mockItemTwo = [
      {
        _id: "2",
        section: "clothes",
        type: "shirt",
        brand: "Zara",
        name: "Basic shirt",
        discription: "This is best shirt ever",
        gender: "Man",
        color: ["Red"],
        size: ["M"],
        img:
          "https://static.zara.net/photos///2019/V/0/2/p/3057/429/615/2/w/560/3057429615_1_1_1.jpg?ts=1552666222871",
        price: 25,
        availability: true
      }
    ];
    spyOn(httpService, "getCartItemsObjects")
      .withArgs(["1"])
      .and.returnValue(
        Observable.create((observer: Observer<any[]>) => {
          observer.next(mockItemOne);
          return observer;
        })
      )
      .withArgs(["2"])
      .and.returnValue(
        Observable.create((observer: Observer<any[]>) => {
          observer.next(mockItemTwo);
          return observer;
        })
      );

    tick();
    component.getDataToCreateTable();
    expect(component.newCartItem.length).toBe(1);
    expect(component.newCartItem[0].brand).toBe("Zara");
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].gender).toBe("Man");
  }));


  it("should no set data to create tables if user properties is empty", fakeAsync(() => {
    component.activeUser.newCartItems = [];
    component.activeUser.cartItems = [];
  
    spyOn(httpService, "getCartItemsObjects")
      .withArgs([])
      .and.returnValue(
        Observable.create((observer: Observer<any[]>) => {
          observer.next([]);
          return observer;
        })
      )


    tick();
    component.getDataToCreateTable();
    expect(component.newCartItem.length).toBe(0);
    expect(component.cartItems.length).toBe(0);
  
  }));
});
