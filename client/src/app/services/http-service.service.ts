import { Injectable } from "@angular/core";
import { CatalogItem, User } from "../models";
import { Observable, of } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { UserServiceService } from "../services/user-service.service";
@Injectable({
  providedIn: "root"
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<CatalogItem[]> {
    return this.http.get<CatalogItem[]>("http://localhost:5000/catalog");
  }

  getById(id: string): Observable<CatalogItem> {
    return this.http.get<CatalogItem>(`http://localhost:5000/catalog/${id}`);
  }

  getCartItems(userId): Observable<User> {
    const id = JSON.stringify({ userId: userId });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth-token")
      })
    };

    return this.http.post<User>("http://localhost:5000/cart", id, httpOptions);
  }
  addCartItem(userId: string, item: CatalogItem[]): Observable<User> {
    const newItems = JSON.stringify({ item: item });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("auth-token")
      })
    };

    return this.http.post<User>(
      `http://localhost:5000/cart/${userId}`,
      newItems,
      httpOptions
    );
  }
}
