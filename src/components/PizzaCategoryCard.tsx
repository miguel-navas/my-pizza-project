import React, { useState } from 'react';
import { ShoppingCart, Copy } from 'lucide-react';
import { Pizza, PizzaSize } from '../types/Pizza';
import { useApp } from '../context/AppContext';
import HalfAndHalfModal from './HalfAndHalfModal';

interface PizzaCategoryCardProps {
  pizza: Pizza;
}

const PizzaCategoryCard: React.FC<PizzaCategoryCardProps> = ({ pizza }) => {
  const { addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(pizza.sizes[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: `${pizza.id}-${selectedSize.size}`,
      name: pizza.name,
      image: pizza.image,
      size: selectedSize.size,
      price: selectedSize.price,
      type: 'pizza',
      description: `Tamanho: ${selectedSize.size}`
    });
  };

  return (
    <>
      <div className="bg-black border border-gold-old rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-gold-old/20 flex flex-col">
        <div className="bg-gold-old text-black px-4 py-3">
          <h3 className="font-bold text-lg text-center">{pizza.name}</h3>
        </div>

        <div className="p-4 flex-grow">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-40 object-cover rounded-lg mb-4"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x400/1a1a1a/c79845?text=Pizza'; }}
          />
          
          <div className="mb-4">
            <h4 className="text-gold-old font-semibold mb-2 text-sm">Ingredientes:</h4>
            <div className="flex flex-wrap gap-1">
              {pizza.ingredients.map((ingredient, index) => (
                <span key={index} className="bg-gold-old/20 text-gold-old-light text-xs px-2 py-1 rounded-full border border-gold-old/30">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gold-old text-black px-4 py-4 mt-auto">
          <div className="mb-4">
            <h4 className="font-semibold mb-2 text-sm">Escolha o tamanho:</h4>
            <div className="grid grid-cols-3 gap-2">
              {pizza.sizes.map((size) => (
                <button
                  key={size.size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all duration-300 border ${selectedSize.size === size.size ? 'bg-black text-gold-old border-gold-old' : 'bg-black text-gray-400 border-gray-600 hover:border-gold-old hover:text-gold-old'}`}
                >
                  <div className="text-center">
                    <div className="font-bold">{size.size}</div>
                    <div className="text-xs">R$ {size.price.toFixed(2)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="font-semibold text-sm">Tamanho: {selectedSize.size}</p>
            </div>
            <div>
              <p className="font-bold text-lg text-green-700">R$ {selectedSize.price.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-gold-old py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-black text-gold-old py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Meio a Meio</span>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <HalfAndHalfModal
          firstHalf={pizza}
          size={selectedSize}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PizzaCategoryCard;
