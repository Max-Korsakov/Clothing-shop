import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  constructor() {}

  public filterItems(items) {
    items.filter(item => {
      if (Number(item.id) > 5) {
        return item;
      }
    });
  }
}
