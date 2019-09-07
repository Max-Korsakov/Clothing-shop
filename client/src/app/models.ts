export interface User {
  id: string;
  email: string;
  password: string;
  firstName: number;
  newCartItems?:Array<string>;
  cartItems: Array<string>;
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
  section: string;
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
