import { Injectable } from "@angular/core";
import { CatalogItem } from "../models";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<CatalogItem[]> {
    return this.temporaryCatalogItemsMock;
  }

  public temporaryCatalogItemsMock: Observable<CatalogItem[]> = of([
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
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
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
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
      availability: true
    },
    {
      id: "3",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Man",
      color: ["Red"],
      size: ["M"],
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
      availability: true
    },
    {
      id: "4",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Man",
      color: ["Red"],
      size: ["M"],
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
      availability: true
    },
    {
      id: "5",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Man",
      color: ["Red"],
      size: ["M"],
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
      availability: true
    },
    {
      id: "6",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Man",
      color: ["Red"],
      size: ["M"],
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
      availability: true
    },
    {
      id: "7",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Man",
      color: ["Red"],
      size: ["M"],
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
      availability: true
    },
    {
      id: "8",
      section: "clothes",
      type: "shirt",
      brand: "Zara",
      name: "Basic shirt",
      discription: "This is best shirt ever",
      gender: "Man",
      color: ["Red"],
      size: ["M"],
      img: "https://material.angular.io/assets/img/examples/shiba2.jpg",
      price: 3,
      availability: true
    }
  ]);
}
