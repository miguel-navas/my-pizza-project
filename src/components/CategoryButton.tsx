import React from 'react';
import { PizzaCategory } from '../types/Pizza';

interface CategoryButtonProps {
  category: PizzaCategory;
  onClick: (type: PizzaCategory['type']) => void;
  isSelected: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onClick, isSelected }) => {
  return (
    <button
      onClick={() => onClick(category.type)}
      className={`
        bg-black border border-gold-old rounded-lg p-4 transition-all duration-300
        hover:bg-gold-old hover:text-black group
        ${isSelected ? 'bg-gold-old text-black' : 'text-gold-old'}
        transform hover:scale-105 active:scale-95
      `}
    >
      <div className="flex flex-col items-center space-y-2">
        <span className="text-3xl">{category.icon}</span>
        <h3 className="font-bold text-lg">{category.name}</h3>
        <div className={`
          px-3 py-1 rounded-full text-sm font-semibold
          ${isSelected 
            ? 'bg-black text-gold-old' 
            : 'bg-gold-old text-black group-hover:bg-black group-hover:text-gold-old'
          }
        `}>
          {category.count} opções
        </div>
      </div>
    </button>
  );
};

export default CategoryButton;
