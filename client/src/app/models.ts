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
