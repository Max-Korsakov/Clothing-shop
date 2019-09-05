import { Injectable } from '@angular/core';
import {User} from '../models'
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

public addItemToCart(item) {
console.log(item);
}

public addItemToFavorite(item) {
  console.log(item);
  }

}
