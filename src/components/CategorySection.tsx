import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { pizzaCategories, allPizzas } from '../data/pizzaData';
import { PizzaCategory } from '../types/Pizza';
import CategoryButton from './CategoryButton';
import PizzaCategoryCard from './PizzaCategoryCard';

const CategorySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PizzaCategory['type'] | null>(null);

  const handleCategoryClick = (type: PizzaCategory['type']) => {
    setSelectedCategory(selectedCategory === type ? null : type);
  };

  const selectedCategoryData = pizzaCategories.find(c => c.type === selectedCategory);
  const categoryPizzas = selectedCategory ? allPizzas.filter(pizza => pizza.category === selectedCategory) : [];

  if (selectedCategory && categoryPizzas.length > 0) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center space-x-2 text-gold-old hover:text-gold-old-light mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </button>
            <h2 className="text-2xl md:text-3xl font-bold text-gold-old">
              Pizzas {selectedCategoryData?.name}s
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPizzas.map((pizza) => (
              <PizzaCategoryCard key={pizza.id} pizza={pizza} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gold-old text-center mb-8">
          Nossos Sabores
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pizzaCategories.map((category) => (
            <CategoryButton
              key={category.type}
              category={category}
              onClick={handleCategoryClick}
              isSelected={selectedCategory === category.type}
            />
          ))}
        </div>

        {selectedCategory && categoryPizzas.length === 0 && (
          <div className="mt-8 p-6 bg-gold-old/10 border border-gold-old rounded-lg">
            <h3 className="text-xl font-bold text-gold-old text-center">
              Categoria: {selectedCategoryData?.name}
            </h3>
            <p className="text-gold-old-light text-center mt-2">
              Carregando pizzas desta categoria...
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
