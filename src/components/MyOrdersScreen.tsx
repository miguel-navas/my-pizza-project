import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, Package, Truck, MapPin, History, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types/Order';

const MyOrdersScreen: React.FC = () => {
  const { orders, setCurrentScreen, user, reorderFromHistory } = useApp();
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <button onClick={() => setCurrentScreen('home')} className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <h2 className="text-2xl font-bold text-gold-old mb-4">Meus Pedidos</h2>
          <p className="text-gold-old-light mb-6">Você precisa estar logado para ver seus pedidos.</p>
          <button onClick={() => setCurrentScreen('login')} className="bg-gold-old text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors">
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const pastOrders = orders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

  const ordersToShow = activeTab === 'active' ? activeOrders : pastOrders;

  const renderOrderList = (orderList: Order[]) => {
    if (orderList.length === 0) {
      return (
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-gold-old mb-2">
            {activeTab === 'active' ? 'Nenhum pedido em andamento' : 'Nenhum pedido no histórico'}
          </h3>
          <p className="text-gold-old-light mb-4">
            {activeTab === 'active' ? 'Que tal pedir uma pizza agora?' : 'Faça seu primeiro pedido para vê-lo aqui!'}
          </p>
          <button onClick={() => setCurrentScreen('home')} className="bg-gold-old text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors">
            Ver Cardápio
          </button>
        </div>
      );
    }
    return (
      <div className="space-y-6">
        {orderList.map((order) => <OrderCard key={order.id} order={order} isHistory={activeTab === 'history'} reorder={reorderFromHistory} />)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button onClick={() => setCurrentScreen('home')} className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h2 className="text-2xl font-bold text-gold-old mb-6">Meus Pedidos</h2>

        <div className="flex border-b border-gold-old/30 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold ${activeTab === 'active' ? 'border-b-2 border-gold-old text-gold-old' : 'text-gray-400'}`}
          >
            <Clock className="w-5 h-5" />
            <span>Em Andamento</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-4 py-2 font-semibold ${activeTab === 'history' ? 'border-b-2 border-gold-old text-gold-old' : 'text-gray-400'}`}
          >
            <History className="w-5 h-5" />
            <span>Histórico</span>
          </button>
        </div>

        {renderOrderList(ordersToShow)}
      </div>
    </div>
  );
};

interface OrderCardProps {
  order: Order;
  isHistory: boolean;
  reorder: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isHistory, reorder }) => {
  const getStatusIcon = (iconName: string) => {
    switch (iconName) {
      case 'check': return <CheckCircle className="w-5 h-5" />;
      case 'package': return <Package className="w-5 h-5" />;
      case 'truck': return <Truck className="w-5 h-5" />;
      case 'map': return <MapPin className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const currentStatusIndex = order.statusHistory.findIndex(status => !status.completed);
  const activeStatusIndex = currentStatusIndex === -1 ? order.statusHistory.length - 1 : currentStatusIndex;

  return (
    <div className="bg-black border border-gold-old rounded-lg p-6">
      <div className="border-b border-gold-old/30 pb-4 mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gold-old">Pedido #{order.id}</h3>
            <p className="text-gold-old-light text-sm">{order.createdAt.toLocaleDateString('pt-BR')} às {order.createdAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="text-right">
            <p className="text-gold-old font-semibold">Total: R$ {order.total.toFixed(2)}</p>
            <p className="text-gold-old-light text-sm">{order.paymentMethod}</p>
          </div>
        </div>
        {!isHistory && order.estimatedDelivery && (
          <div className="bg-gold-old/10 border border-gold-old/30 rounded-lg p-3 mt-3">
            <p className="text-gold-old text-sm"><strong>Previsão de entrega:</strong> {order.estimatedDelivery.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-gold-old font-semibold mb-3">Itens:</h4>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center space-x-3 bg-gold-old/5 rounded-lg p-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100x100/1a1a1a/c79845?text=Item'; }}/>
              <div className="flex-1">
                <p className="text-gold-old font-semibold">{item.name}</p>
                <p className="text-gold-old-light text-sm">{item.size || item.description} - Qtd: {item.quantity}</p>
              </div>
              <p className="text-gold-old font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {!isHistory ? (
        <div className="space-y-4">
          <h4 className="text-gold-old font-semibold">Status do Pedido:</h4>
          {order.statusHistory.map((status, index) => {
            const isActive = index === activeStatusIndex;
            const isCompleted = status.completed;
            const colorClass = isCompleted ? 'text-green-500 bg-green-500/20 border-green-500' : isActive ? 'text-gold-old bg-gold-old/20 border-gold-old animate-pulse' : 'text-gray-500 bg-gray-500/20 border-gray-500';
            return (
              <div key={status.id} className="flex items-start space-x-4">
                {index < order.statusHistory.length - 1 && <div className="absolute ml-6 mt-8 w-0.5 h-8 bg-gray-600"></div>}
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${colorClass}`}>{getStatusIcon(status.icon)}</div>
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className={`font-semibold ${isCompleted ? 'text-green-400' : isActive ? 'text-gold-old' : 'text-gray-500'}`}>{status.name}</h5>
                      <p className={`text-sm ${isCompleted ? 'text-green-300' : isActive ? 'text-gold-old-light' : 'text-gray-400'}`}>{status.description}</p>
                    </div>
                    {status.timestamp && <p className="text-xs text-gray-400">{status.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex justify-end">
          <button onClick={() => reorder(order.id)} className="bg-gold-old text-black px-4 py-2 rounded-lg font-semibold hover:bg-gold-old-light flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Pedir Novamente</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrdersScreen;
