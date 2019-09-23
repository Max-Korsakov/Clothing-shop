import { Injectable } from "@angular/core";
import { CatalogItem, User } from "../models";
import { Observable, of, BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { UserServiceService } from "../services/user-service.service";
@Injectable({
  providedIn: "root"
})
export class HttpServiceService {
  constructor(private http: HttpClient) {}

  public catalogUpdate = new BehaviorSubject(undefined);
  public catalog;
  getFilterProps(): Observable<any> {
    return this.http.get<any>("http://localhost:5000/catalog");
  }

  getItemsWithParams(filterData, paginationData) {
    let parameters = new HttpParams();
    if (filterData.gender) {
      parameters = parameters.append("filterDataGender", filterData.gender);
    }
    if (filterData.brand) {
      parameters = parameters.append("filterDataBrand", filterData.brand);
    }
    if (filterData.type) {
      parameters = parameters.append("filterDataType", filterData.type);
    }
    if (filterData.color) {
      parameters = parameters.append("filterDataColor", filterData.color);
    }
    if (filterData.size) {
      parameters = parameters.append("filterDataSize", filterData.size);
    }
    if (filterData.maxPrice) {
      parameters = parameters.append("filterDataMaxPrice", filterData.maxPrice);
    }
    if (paginationData && paginationData.previousPageIndex) {
      parameters = parameters.append(
        "paginatorDataPreviousPageIndex",
        paginationData.previousPageIndex
      );
    }
    if (paginationData && paginationData.pageIndex) {
      parameters = parameters.append(
        "paginatorDataPageIndex",
        paginationData.pageIndex
      );
    }
    if (paginationData && paginationData.pageSize) {
      parameters = parameters.append(
        "paginatorDataPageSize",
        paginationData.pageSize
      );
    }
    if (paginationData && paginationData.length) {
      parameters = parameters.append(
        "paginatorDataLength",
        paginationData.length
      );
    }

    this.http
      .get<any>("http://localhost:5000/catalog/data", {
        params: parameters
      })
      .subscribe(data => {
        data.filterData = filterData;

        this.catalogUpdate.next(data);
      });
  }

  searchItems(data: string) {
    let parameters = new HttpParams();
    parameters = parameters.append("searchData", data);
    return this.http.get<any>("http://localhost:5000/catalog/search", {
      params: parameters
    });
  }

  getById(id: string): Observable<CatalogItem> {
    return this.http.get<CatalogItem>(`http://localhost:5000/catalog/${id}`);
  }

  getCartItems(userId): Observable<string[]> {
    let parameters = new HttpParams();
    parameters = parameters.append("userId", userId);

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append(
      "Authorization",
      localStorage.getItem("auth-token")
    );

    return this.http.get<any>(`http://localhost:5000/cart/${userId}`, {
      params: parameters,
      headers: headers
    });
  }

  getCartItemsObjects(itemsArray): Observable<CatalogItem[]> {
    const itemsArrayString = JSON.stringify({ itemsArray: itemsArray });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post<any[]>(
      `http://localhost:5000/catalog/items`,
      itemsArrayString,
      httpOptions
    );
  }

  addCartItem(userId: string, item: any): Observable<string[]> {
    const newItem = JSON.stringify({ item: item });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };
    return this.http.post<string[]>(
      `http://localhost:5000/cart/${userId}`,
      newItem,
      httpOptions
    );
  }

  getFavoriteItems(userId): Observable<string[]> {
    let parameters = new HttpParams();
    parameters = parameters.append("userId", userId);

    return this.http.get<any>(`http://localhost:5000/favorite/${userId}`, {
      params: parameters,
    
    });
  }

  addFavoriteItem(userId: string, item: string): Observable<string[]> {
    const newItem = JSON.stringify({ item: item });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
     //   Authorization: localStorage.getItem("auth-token")
      })
    };
    return this.http.post<string[]>(
      `http://localhost:5000/favorite/${userId}`,
      newItem,
      httpOptions
    );
  }

  deleteFavoriteItem(userId: string, item: any): Observable<string[]> {
    const newItem = JSON.stringify({ item: item });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
       // Authorization: localStorage.getItem("auth-token")
      })
    };
    return this.http.post<string[]>(
      `http://localhost:5000/delete/${userId}`,
      newItem,
      httpOptions
    );
  }

  deleteCartItem(userId: string, item: any): Observable<string[]> {
    const newItem = JSON.stringify({ item: item });
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      //  Authorization: localStorage.getItem("auth-token")
      })
    };
    return this.http.post<string[]>(
      `http://localhost:5000/cart/delete/${userId}`,
      newItem,
      httpOptions
    );
  }
}
