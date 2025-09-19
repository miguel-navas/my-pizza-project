import React from 'react';
import { Gift } from 'lucide-react';
import { promotionPizzas } from '../data/pizzaData';
import PizzaCard from './PizzaCard';

const PromotionSection: React.FC = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gold-old mb-2">
            🔥 Promoções do Dia 🔥
          </h2>
          <p className="text-gold-old-light text-lg">
            Aproveite nossas ofertas especiais por tempo limitado!
          </p>
        </div>

        <div className="bg-gold-old/10 border-2 border-dashed border-gold-old rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-center text-center space-y-4 md:space-y-0 md:space-x-6">
          <Gift className="w-12 h-12 text-gold-old" />
          <div>
            <h3 className="text-xl font-bold text-gold-old">Ganhe um Refrigerante!</h3>
            <p className="text-gold-old-light">
              Na compra de 2 ou mais pizzas grandes (G), você ganha um refrigerante 2L.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotionPizzas.map((pizza) => (
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
