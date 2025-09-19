import React from 'react';
import { Pizza, User, ShoppingCart, LogOut, Truck, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { user, setUser, cartItems, orders, setCurrentScreen } = useApp();

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const activeOrdersCount = orders.filter(order => 
    order.status !== 'delivered' && order.status !== 'cancelled'
  ).length;

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('home');
  };

  return (
    <header className="bg-black border-b border-gold-old py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentScreen('home')}
          >
            <Pizza className="w-8 h-8 text-gold-old" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gold-old">
                Bella Pizza
              </h1>
              <p className="text-gold-old-light text-sm">
                Pizzaria Artesanal desde 1985
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="text-gold-old text-right hidden md:block">
                  <p className="text-sm">Olá, {user.name}</p>
                  <p className="text-xs text-gold-old-light">{user.loyaltyPoints} pontos</p>
                </div>
                
                <button
                  onClick={() => setCurrentScreen('loyalty')}
                  className="p-2 text-gold-old hover:text-gold-old-light transition-colors"
                  title="Plano de Fidelidade"
                >
                  <Award className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setCurrentScreen('my-orders')}
                  className="relative p-2 text-gold-old hover:text-gold-old-light transition-colors"
                  title="Meus Pedidos"
                >
                  <Truck className="w-6 h-6" />
                  {activeOrdersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeOrdersCount}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentScreen('login')}
                className="flex items-center space-x-2 bg-gold-old text-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-old-light transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="hidden md:inline">Entrar</span>
              </button>
            )}

            <button
              onClick={() => setCurrentScreen('cart')}
              className="relative p-2 text-gold-old hover:text-gold-old-light transition-colors"
              title="Carrinho de Compras"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {user && (
              <button
                onClick={handleLogout}
                className="p-2 text-gold-old hover:text-gold-old-light transition-colors"
                title="Sair"
              >
                <LogOut className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
