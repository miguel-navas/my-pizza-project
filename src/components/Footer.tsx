import React from 'react';
import { Clock, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gold-old py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <Clock className="w-6 h-6 text-gold-old mb-2" />
            <h3 className="text-gold-old font-bold mb-2">Horário de Funcionamento</h3>
            <p className="text-gold-old-light text-sm">Segunda a Quinta: 18h às 23h</p>
            <p className="text-gold-old-light text-sm">Sexta a Domingo: 18h às 24h</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <Phone className="w-6 h-6 text-gold-old mb-2" />
            <h3 className="text-gold-old font-bold mb-2">Contato</h3>
            <p className="text-gold-old-light text-sm">(11) 99999-9999</p>
            <p className="text-gold-old-light text-sm">contato@bellapizza.com.br</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <MapPin className="w-6 h-6 text-gold-old mb-2" />
            <h3 className="text-gold-old font-bold mb-2">Endereço</h3>
            <p className="text-gold-old-light text-sm">Rua das Pizzas, 123</p>
            <p className="text-gold-old-light text-sm">Centro - São Paulo/SP</p>
          </div>
        </div>

        <div className="border-t border-gold-old mt-6 pt-6 text-center">
          <p className="text-gold-old-light text-sm">
            © 2025 Bella Pizza - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
