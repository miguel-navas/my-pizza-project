import React from 'react';
import { X } from 'lucide-react';
import { Pizza, PizzaSize } from '../types/Pizza';
import { allPizzas } from '../data/pizzaData';
import { useApp } from '../context/AppContext';

interface HalfAndHalfModalProps {
  firstHalf: Pizza;
  size: PizzaSize;
  onClose: () => void;
}

const HalfAndHalfModal: React.FC<HalfAndHalfModalProps> = ({ firstHalf, size, onClose }) => {
  const { addToCart } = useApp();

  const handleSelectSecondHalf = (secondHalf: Pizza) => {
    const firstHalfPrice = firstHalf.sizes.find(s => s.size === size.size)?.price || 0;
    const secondHalfPrice = secondHalf.sizes.find(s => s.size === size.size)?.price || 0;
    const finalPrice = Math.max(firstHalfPrice, secondHalfPrice);
    
    // Sort IDs to create a consistent unique ID
    const sortedIds = [firstHalf.id, secondHalf.id].sort();

    addToCart({
      id: `half-${sortedIds[0]}-${sortedIds[1]}-${size.size}`,
      name: `Meio a Meio: ${firstHalf.name} / ${secondHalf.name}`,
      image: firstHalf.image,
      price: finalPrice,
      size: size.size,
      type: 'pizza',
      description: `Tamanho: ${size.size}`
    });
    onClose();
  };

  const compatiblePizzas = allPizzas.filter(p => p.id !== firstHalf.id);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-black border border-gold-old rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gold-old/30">
          <h2 className="text-xl font-bold text-gold-old">Escolha o segundo sabor</h2>
          <button onClick={onClose} className="text-gold-old hover:text-gold-old-light"><X /></button>
        </div>
        
        <div className="p-4 overflow-y-auto">
          <div className="mb-4 p-3 bg-gold-old/10 rounded-lg">
            <p className="text-gold-old"><strong>Primeiro Sabor:</strong> {firstHalf.name}</p>
            <p className="text-gold-old-light"><strong>Tamanho:</strong> {size.size}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatiblePizzas.map(pizza => (
              <div key={pizza.id} className="bg-black border border-gold-old/50 rounded-lg overflow-hidden">
                <img src={pizza.image} alt={pizza.name} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h3 className="text-gold-old font-semibold text-sm truncate">{pizza.name}</h3>
                  <p className="text-gold-old-light text-xs mb-2">
                    Preço no tamanho {size.size}: R$ {pizza.sizes.find(s => s.size === size.size)?.price.toFixed(2) || 'N/A'}
                  </p>
                  <button
                    onClick={() => handleSelectSecondHalf(pizza)}
                    className="w-full bg-gold-old text-black text-xs py-1 rounded-md font-semibold hover:bg-gold-old-light"
                  >
                    Selecionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalfAndHalfModal;
