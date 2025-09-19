export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  loyaltyPoints: number;
  largePizzasPurchased: number;
  largePizzasRewardAvailable: boolean;
}

export interface CartItem {
  id: string; // Unique ID for the cart item
  name: string;
  image: string;
  price: number;
  quantity: number;
  type: 'pizza' | 'drink';
  size?: string;
  description?: string;
}

export interface PaymentMethod {
  type: 'pix' | 'credit' | 'debit';
  cardData?: {
    number: string;
    holder: string;
    expiry: string;
    cvv: string;
  };
}
