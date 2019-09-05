export interface User {
  id: string;
  email: string;
  password: string;
  firstName: number;
  cartItems: string[];
  favoriteItems: string[];
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
  id: string;
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
