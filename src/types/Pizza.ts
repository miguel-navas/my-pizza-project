export interface PizzaSize {
  size: string;
  price: number;
}

export interface Pizza {
  id: string;
  name: string;
  image: string;
  category: 'tradicional' | 'especial' | 'doce' | 'vegetariana';
  ingredients: string[];
  sizes: PizzaSize[];
  isPromotion?: boolean;
  originalPrice?: number;
}

export interface PizzaCategory {
  name: string;
  type: 'tradicional' | 'especial' | 'doce' | 'vegetariana';
  count: number;
  icon: string;
}

export interface CartPizza {
  id: string;
  name: string;
  image: string;
  size: string;
  price: number;
}
