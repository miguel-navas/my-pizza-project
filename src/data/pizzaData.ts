import { Pizza, PizzaCategory } from '../types/Pizza';

export const pizzaCategories: PizzaCategory[] = [
  {
    name: 'Tradicional',
    type: 'tradicional',
    count: 8,
    icon: '🍕'
  },
  {
    name: 'Especial',
    type: 'especial',
    count: 6,
    icon: '⭐'
  },
  {
    name: 'Doce',
    type: 'doce',
    count: 5,
    icon: '🍰'
  },
  {
    name: 'Vegetariana',
    type: 'vegetariana',
    count: 6,
    icon: '🥬'
  }
];

export const allPizzas: Pizza[] = [
  // Pizzas Tradicionais
  {
    id: '1',
    name: 'Margherita',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Manjericão', 'Azeite'],
    sizes: [
      { size: 'Pequena', price: 24.90 },
      { size: 'Média', price: 32.90 },
      { size: 'Grande', price: 39.90 }
    ]
  },
  {
    id: '2',
    name: 'Calabresa',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Calabresa', 'Cebola'],
    sizes: [
      { size: 'Pequena', price: 26.90 },
      { size: 'Média', price: 34.90 },
      { size: 'Grande', price: 42.90 }
    ]
  },
  {
    id: '3',
    name: 'Portuguesa',
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Presunto', 'Ovos', 'Cebola', 'Azeitona'],
    sizes: [
      { size: 'Pequena', price: 28.90 },
      { size: 'Média', price: 36.90 },
      { size: 'Grande', price: 44.90 }
    ]
  },
  {
    id: '4',
    name: 'Quatro Queijos',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Parmesão', 'Gorgonzola', 'Catupiry'],
    sizes: [
      { size: 'Pequena', price: 30.90 },
      { size: 'Média', price: 38.90 },
      { size: 'Grande', price: 46.90 }
    ]
  },
  {
    id: '5',
    name: 'Napolitana',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Tomate', 'Manjericão', 'Alho'],
    sizes: [
      { size: 'Pequena', price: 25.90 },
      { size: 'Média', price: 33.90 },
      { size: 'Grande', price: 41.90 }
    ]
  },
  {
    id: '6',
    name: 'Frango Catupiry',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Frango desfiado', 'Catupiry'],
    sizes: [
      { size: 'Pequena', price: 27.90 },
      { size: 'Média', price: 35.90 },
      { size: 'Grande', price: 43.90 }
    ]
  },
  {
    id: '7',
    name: 'Pepperoni',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Pepperoni'],
    sizes: [
      { size: 'Pequena', price: 29.90 },
      { size: 'Média', price: 37.90 },
      { size: 'Grande', price: 45.90 }
    ]
  },
  {
    id: '8',
    name: 'Toscana',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop',
    category: 'tradicional',
    ingredients: ['Molho de tomate', 'Mussarela', 'Calabresa', 'Bacon', 'Cebola'],
    sizes: [
      { size: 'Pequena', price: 31.90 },
      { size: 'Média', price: 39.90 },
      { size: 'Grande', price: 47.90 }
    ]
  },

  // Pizzas Especiais
  {
    id: '9',
    name: 'Salmão Grelhado',
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop',
    category: 'especial',
    ingredients: ['Molho branco', 'Mussarela', 'Salmão grelhado', 'Cream cheese', 'Alcaparras'],
    sizes: [
      { size: 'Pequena', price: 38.90 },
      { size: 'Média', price: 48.90 },
      { size: 'Grande', price: 58.90 }
    ]
  },
  {
    id: '10',
    name: 'Camarão Especial',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=400&fit=crop',
    category: 'especial',
    ingredients: ['Molho de tomate', 'Mussarela', 'Camarão', 'Catupiry', 'Cebolinha'],
    sizes: [
      { size: 'Pequena', price: 42.90 },
      { size: 'Média', price: 52.90 },
      { size: 'Grande', price: 62.90 }
    ]
  },
  {
    id: '11',
    name: 'Carbonara',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
    category: 'especial',
    ingredients: ['Molho branco', 'Mussarela', 'Bacon', 'Ovos', 'Parmesão', 'Pimenta'],
    sizes: [
      { size: 'Pequena', price: 35.90 },
      { size: 'Média', price: 45.90 },
      { size: 'Grande', price: 55.90 }
    ]
  },
  {
    id: '12',
    name: 'Filé Mignon',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
    category: 'especial',
    ingredients: ['Molho de tomate', 'Mussarela', 'Filé mignon', 'Champignon', 'Rúcula'],
    sizes: [
      { size: 'Pequena', price: 45.90 },
      { size: 'Média', price: 55.90 },
      { size: 'Grande', price: 65.90 }
    ]
  },
  {
    id: '13',
    name: 'Trufa Negra',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop',
    category: 'especial',
    ingredients: ['Molho branco', 'Mussarela', 'Trufa negra', 'Parmesão', 'Azeite trufado'],
    sizes: [
      { size: 'Pequena', price: 55.90 },
      { size: 'Média', price: 75.90 },
      { size: 'Grande', price: 95.90 }
    ]
  },
  {
    id: '14',
    name: 'Polvo Mediterrâneo',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
    category: 'especial',
    ingredients: ['Molho de tomate', 'Mussarela', 'Polvo', 'Azeitonas', 'Tomate seco', 'Azeite'],
    sizes: [
      { size: 'Pequena', price: 48.90 },
      { size: 'Média', price: 58.90 },
      { size: 'Grande', price: 68.90 }
    ]
  },

  // Pizzas Doces
  {
    id: '15',
    name: 'Chocolate com Morango',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
    category: 'doce',
    ingredients: ['Chocolate ao leite', 'Morangos frescos', 'Leite condensado'],
    sizes: [
      { size: 'Pequena', price: 24.90 },
      { size: 'Média', price: 32.90 },
      { size: 'Grande', price: 39.90 }
    ]
  },
  {
    id: '16',
    name: 'Banana com Canela',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
    category: 'doce',
    ingredients: ['Banana', 'Canela', 'Açúcar', 'Leite condensado'],
    sizes: [
      { size: 'Pequena', price: 22.90 },
      { size: 'Média', price: 29.90 },
      { size: 'Grande', price: 36.90 }
    ]
  },
  {
    id: '17',
    name: 'Romeu e Julieta',
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop',
    category: 'doce',
    ingredients: ['Goiabada', 'Queijo minas', 'Canela'],
    sizes: [
      { size: 'Pequena', price: 26.90 },
      { size: 'Média', price: 34.90 },
      { size: 'Grande', price: 42.90 }
    ]
  },
  {
    id: '18',
    name: 'Nutella com Morango',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=400&fit=crop',
    category: 'doce',
    ingredients: ['Nutella', 'Morangos frescos', 'Açúcar de confeiteiro'],
    sizes: [
      { size: 'Pequena', price: 32.90 },
      { size: 'Média', price: 42.90 },
      { size: 'Grande', price: 52.90 }
    ]
  },
  {
    id: '19',
    name: 'Prestígio',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop',
    category: 'doce',
    ingredients: ['Chocolate', 'Coco ralado', 'Leite condensado'],
    sizes: [
      { size: 'Pequena', price: 28.90 },
      { size: 'Média', price: 36.90 },
      { size: 'Grande', price: 44.90 }
    ]
  },

  // Pizzas Vegetarianas
  {
    id: '20',
    name: 'Margherita Vegana',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop',
    category: 'vegetariana',
    ingredients: ['Molho de tomate', 'Queijo vegano', 'Manjericão', 'Tomate cereja'],
    sizes: [
      { size: 'Pequena', price: 27.90 },
      { size: 'Média', price: 35.90 },
      { size: 'Grande', price: 43.90 }
    ]
  },
  {
    id: '21',
    name: 'Mediterrânea',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=400&fit=crop',
    category: 'vegetariana',
    ingredients: ['Molho de tomate', 'Mussarela', 'Berinjela', 'Abobrinha', 'Pimentão', 'Azeitonas'],
    sizes: [
      { size: 'Pequena', price: 29.90 },
      { size: 'Média', price: 37.90 },
      { size: 'Grande', price: 45.90 }
    ]
  },
  {
    id: '22',
    name: 'Rúcula com Tomate Seco',
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop',
    category: 'vegetariana',
    ingredients: ['Molho de tomate', 'Mussarela', 'Rúcula', 'Tomate seco', 'Parmesão'],
    sizes: [
      { size: 'Pequena', price: 31.90 },
      { size: 'Média', price: 39.90 },
      { size: 'Grande', price: 47.90 }
    ]
  },
  {
    id: '23',
    name: 'Champignon',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop',
    category: 'vegetariana',
    ingredients: ['Molho branco', 'Mussarela', 'Champignon', 'Alho', 'Salsinha'],
    sizes: [
      { size: 'Pequena', price: 28.90 },
      { size: 'Média', price: 36.90 },
      { size: 'Grande', price: 44.90 }
    ]
  },
  {
    id: '24',
    name: 'Palmito',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop',
    category: 'vegetariana',
    ingredients: ['Molho de tomate', 'Mussarela', 'Palmito', 'Tomate', 'Orégano'],
    sizes: [
      { size: 'Pequena', price: 26.90 },
      { size: 'Média', price: 34.90 },
      { size: 'Grande', price: 42.90 }
    ]
  },
  {
    id: '25',
    name: 'Escarola',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop',
    category: 'vegetariana',
    ingredients: ['Molho de tomate', 'Mussarela', 'Escarola', 'Alho', 'Azeitonas'],
    sizes: [
      { size: 'Pequena', price: 25.90 },
      { size: 'Média', price: 33.90 },
      { size: 'Grande', price: 41.90 }
    ]
  }
];

export const promotionPizzas = allPizzas.filter(pizza => [1, 2, 15, 21, 9, 16].includes(parseInt(pizza.id))).map(pizza => ({
  ...pizza,
  isPromotion: true,
  originalPrice: pizza.sizes[1].price + 10,
  // Usar preço médio para promoção
  size: pizza.sizes[1].size,
  price: pizza.sizes[1].price
}));
