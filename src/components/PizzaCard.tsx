import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PromotionPizza {
  id: string;
  name: string;
  image: string;
  size: string;
  price: number;
  category: 'tradicional' | 'especial' | 'doce' | 'vegetariana';
  isPromotion?: boolean;
  originalPrice?: number;
}

interface PizzaCardProps {
  pizza: PromotionPizza;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart({
      pizza: {
        id: pizza.id,
        name: pizza.name,
        image: pizza.image,
        size: pizza.size,
        price: pizza.price
      },
      quantity: 1
    });
  };

  return (
    <div className="bg-black border border-gold-old rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-gold-old/20">
      {/* Header */}
      <div className="bg-gold-old text-black px-4 py-3">
        <h3 className="font-bold text-lg text-center">{pizza.name}</h3>
        {pizza.isPromotion && (
          <div className="text-center">
            <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
              PROMOÇÃO!
            </span>
          </div>
        )}
      </div>

      {/* Body - Image */}
      <div className="relative p-4">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x400/1a1a1a/c79845?text=Pizza';
          }}
        />
      </div>

      {/* Footer */}
      <div className="bg-gold-old text-black px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="font-semibold text-sm">Tamanho: {pizza.size}</p>
          </div>
          <div className="text-right">
            {pizza.originalPrice && (
              <p className="text-red-600 line-through text-sm">
                R$ {pizza.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="font-bold text-lg text-green-700">
              R$ {pizza.price.toFixed(2)}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-gold-old py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
