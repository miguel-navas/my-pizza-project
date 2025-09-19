export interface OrderStatus {
  id: string;
  name: string;
  icon: string;
  description: string;
  timestamp?: Date;
  completed: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: Date;
  estimatedDelivery?: Date;
  deliveryAddress?: string;
  statusHistory: OrderStatus[];
}

// OrderItem is compatible with CartItem
export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  type: 'pizza' | 'drink';
  size?: string;
  description?: string;
}
