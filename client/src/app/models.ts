export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  newCartItems?: [{ itemId: string; itemSize: string; itemColor: string }];
  cartItems: [{ itemId: string; itemSize: string; itemColor: string }];
  favoriteItems: Array<string>;
}

export interface PopupTextContent {
  title: string;
  text: string;
  buttonText: {
    cancel?: string;
    confirm?: string;
  };
}

export interface CatalogItem {
  _id: string;
  type: string;
  brand: string;
  name: string;
  discription: string;
  color: string[];
  gender: string;
  size: string[];
  img: string;
  price: number;
  availability: boolean;
}
