import React from 'react';
import { ArrowLeft, Clock, CheckCircle, Package, Truck, MapPin, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const OrderTrackingScreen: React.FC = () => {
  const { orders, setCurrentScreen, user } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gold-old mb-4">Acompanhar Pedidos</h2>
            <p className="text-gold-old-light mb-6">Você precisa estar logado para acompanhar seus pedidos.</p>
            <button
              onClick={() => setCurrentScreen('login')}
              className="bg-gold-old text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gold-old mb-4">Nenhum Pedido Encontrado</h2>
            <p className="text-gold-old-light mb-6">Você ainda não fez nenhum pedido. Que tal experimentar nossas deliciosas pizzas?</p>
            <button
              onClick={() => setCurrentScreen('home')}
              className="bg-gold-old text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors"
            >
              Ver Cardápio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (iconName: string) => {
    switch (iconName) {
      case 'clock':
        return <Clock className="w-5 h-5" />;
      case 'check':
        return <CheckCircle className="w-5 h-5" />;
      case 'package':
        return <Package className="w-5 h-5" />;
      case 'truck':
        return <Truck className="w-5 h-5" />;
      case 'map':
        return <MapPin className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (completed: boolean, isActive: boolean) => {
    if (completed) return 'text-green-500 bg-green-500/20 border-green-500';
    if (isActive) return 'text-gold-old bg-gold-old/20 border-gold-old animate-pulse';
    return 'text-gray-500 bg-gray-500/20 border-gray-500';
  };

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h2 className="text-2xl font-bold text-gold-old mb-6">Acompanhar Pedidos</h2>

        <div className="space-y-6">
          {orders.map((order) => {
            const currentStatusIndex = order.statusHistory.findIndex(status => !status.completed);
            const activeStatusIndex = currentStatusIndex === -1 ? order.statusHistory.length - 1 : currentStatusIndex;

            return (
              <div key={order.id} className="bg-black border border-gold-old rounded-lg p-6">
                {/* Header do Pedido */}
                <div className="border-b border-gold-old/30 pb-4 mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gold-old">Pedido #{order.id}</h3>
                      <p className="text-gold-old-light text-sm">
                        {order.createdAt.toLocaleDateString('pt-BR')} às {order.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gold-old font-semibold">Total: R$ {order.total.toFixed(2)}</p>
                      <p className="text-gold-old-light text-sm">{order.paymentMethod}</p>
                    </div>
                  </div>
                  
                  {order.estimatedDelivery && (
                    <div className="bg-gold-old/10 border border-gold-old/30 rounded-lg p-3 mt-3">
                      <p className="text-gold-old text-sm">
                        <strong>Previsão de entrega:</strong> {order.estimatedDelivery.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Itens do Pedido */}
                <div className="mb-6">
                  <h4 className="text-gold-old font-semibold mb-3">Itens do Pedido:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 bg-gold-old/5 rounded-lg p-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x400/1a1a1a/c79845?text=Pizza';
                          }}
                        />
                        <div className="flex-1">
                          <p className="text-gold-old font-semibold">{item.name}</p>
                          <p className="text-gold-old-light text-sm">{item.size} - Qtd: {item.quantity}</p>
                        </div>
                        <p className="text-gold-old font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline de Status */}
                <div className="space-y-4">
                  <h4 className="text-gold-old font-semibold">Status do Pedido:</h4>
                  <div className="space-y-4">
                    {order.statusHistory.map((status, index) => {
                      const isActive = index === activeStatusIndex;
                      const isCompleted = status.completed;
                      
                      return (
                        <div key={status.id} className="flex items-start space-x-4">
                          {/* Linha conectora */}
                          {index < order.statusHistory.length - 1 && (
                            <div className="absolute ml-6 mt-8 w-0.5 h-8 bg-gray-600"></div>
                          )}
                          
                          {/* Ícone do status */}
                          <div className={`
                            relative flex items-center justify-center w-12 h-12 rounded-full border-2 
                            ${getStatusColor(isCompleted, isActive)}
                          `}>
                            {getStatusIcon(status.icon)}
                          </div>
                          
                          {/* Conteúdo do status */}
                          <div className="flex-1 pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className={`font-semibold ${
                                  isCompleted ? 'text-green-400' : 
                                  isActive ? 'text-gold-old' : 'text-gray-500'
                                }`}>
                                  {status.name}
                                </h5>
                                <p className={`text-sm ${
                                  isCompleted ? 'text-green-300' : 
                                  isActive ? 'text-gold-old-light' : 'text-gray-400'
                                }`}>
                                  {status.description}
                                </p>
                              </div>
                              {status.timestamp && (
                                <p className="text-xs text-gray-400">
                                  {status.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status atual em destaque */}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="mt-6 bg-gold-old/10 border border-gold-old rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gold-old rounded-full animate-pulse"></div>
                      <p className="text-gold-old font-semibold">
                        Status Atual: {order.statusHistory[activeStatusIndex]?.name}
                      </p>
                    </div>
                    <p className="text-gold-old-light text-sm mt-1 ml-6">
                      {order.statusHistory[activeStatusIndex]?.description}
                    </p>
                  </div>
                )}

                {/* Endereço de entrega */}
                {order.deliveryAddress && (
                  <div className="mt-4 bg-gold-old/5 border border-gold-old/30 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-gold-old" />
                      <h5 className="text-gold-old font-semibold">Endereço de Entrega:</h5>
                    </div>
                    <p className="text-gold-old-light text-sm ml-6">{order.deliveryAddress}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingScreen;
