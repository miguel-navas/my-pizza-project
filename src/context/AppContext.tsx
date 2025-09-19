import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, CartItem } from '../types/User';
import { Order, OrderItem, OrderStatus } from '../types/Order';

type Screen = 'home' | 'login' | 'register' | 'cart' | 'my-orders' | 'loyalty';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'statusHistory'>) => void;
  updateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  reorderFromHistory: (orderId: string) => void;
  claimLargePizzaReward: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const createStatusHistory = (status: Order['status']): OrderStatus[] => {
    const now = Date.now();
    const statuses: OrderStatus[] = [
      { id: '1', name: 'Pedido Recebido', icon: 'clock', description: 'Seu pedido foi recebido e está aguardando confirmação.', timestamp: new Date(now), completed: true },
      { id: '2', name: 'Pedido Aceito', icon: 'check', description: 'Pedido confirmado! Estamos começando a preparar.', timestamp: status !== 'pending' ? new Date(now + 2 * 60000) : undefined, completed: status !== 'pending' },
      { id: '3', name: 'Em Preparação', icon: 'package', description: 'Suas pizzas estão sendo preparadas com muito carinho.', timestamp: ['preparing', 'out_for_delivery', 'delivered'].includes(status) ? new Date(now + 15 * 60000) : undefined, completed: ['preparing', 'out_for_delivery', 'delivered'].includes(status) },
      { id: '4', name: 'Saiu para Entrega', icon: 'truck', description: 'Seu pedido saiu para entrega! Em breve estará aí.', timestamp: ['out_for_delivery', 'delivered'].includes(status) ? new Date(now + 25 * 60000) : undefined, completed: ['out_for_delivery', 'delivered'].includes(status) },
      { id: '5', name: 'Entregue', icon: 'map', description: 'Pedido entregue com sucesso! Aproveite!', timestamp: status === 'delivered' ? new Date(now + 35 * 60000) : undefined, completed: status === 'delivered' }
    ];
    return statuses;
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'statusHistory'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      statusHistory: createStatusHistory(orderData.status),
    };
    
    setOrders(prev => [newOrder, ...prev]);

    if (user) {
      const pointsEarned = Math.floor(newOrder.total / 10);
      const largePizzaCount = newOrder.items.filter(
        item => item.type === 'pizza' && item.size === 'Grande'
      ).reduce((sum, item) => sum + item.quantity, 0);
      
      const newLargePizzasPurchased = user.largePizzasPurchased + largePizzaCount;
      const newRewardAvailable = newLargePizzasPurchased >= 10;

      setUser({ 
        ...user, 
        loyaltyPoints: user.loyaltyPoints + pointsEarned,
        largePizzasPurchased: newLargePizzasPurchased,
        largePizzasRewardAvailable: user.largePizzasRewardAvailable || newRewardAvailable,
      });
    }

    // Simulate order progress
    setTimeout(() => updateOrderStatus(newOrder.id, 'accepted'), 3000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'preparing'), 8000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'out_for_delivery'), 20000);
    setTimeout(() => updateOrderStatus(newOrder.id, 'delivered'), 35000);
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, statusHistory: createStatusHistory(newStatus) }
          : order
      )
    );
  };
  
  const reorderFromHistory = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.items.forEach(item => {
        const { quantity, ...restOfItem } = item;
        addToCart(restOfItem, quantity);
      });
      setCurrentScreen('cart');
    }
  };

  const claimLargePizzaReward = () => {
    if (user && user.largePizzasRewardAvailable) {
      setUser({
        ...user,
        largePizzasPurchased: user.largePizzasPurchased - 10,
        largePizzasRewardAvailable: (user.largePizzasPurchased - 10) >= 10,
      });
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      currentScreen,
      setCurrentScreen,
      orders,
      addOrder,
      updateOrderStatus,
      reorderFromHistory,
      claimLargePizzaReward
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (undefined === context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
