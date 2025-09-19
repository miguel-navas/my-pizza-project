import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Smartphone, GlassWater } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PaymentMethod, CartItem } from '../types/User';
import { OrderItem } from '../types/Order';
import { drinks } from '../data/drinksData';

const CartScreen: React.FC = () => {
  const { user, cartItems, updateQuantity, removeFromCart, clearCart, setCurrentScreen, addOrder, addToCart } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod['type']>('pix');
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleFinishOrder = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    if (!user) {
      alert('Você precisa estar logado para finalizar o pedido!');
      setCurrentScreen('login');
      return;
    }

    if (paymentMethod !== 'pix' && (!cardData.number || !cardData.holder || !cardData.expiry || !cardData.cvv)) {
      alert('Preencha todos os dados do cartão!');
      return;
    }

    const orderItems: OrderItem[] = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      type: item.type,
      size: item.size,
      description: item.description,
    }));

    const paymentMethodText = paymentMethod === 'pix' ? 'PIX' : 
                             paymentMethod === 'credit' ? 'Cartão de Crédito' : 'Cartão de Débito';

    const estimatedDelivery = new Date(Date.now() + 40 * 60000);

    addOrder({
      items: orderItems,
      total,
      status: 'pending',
      paymentMethod: paymentMethodText,
      estimatedDelivery,
      deliveryAddress: 'Rua das Flores, 123 - Centro - São Paulo/SP'
    });

    alert('Pedido realizado com sucesso! Você pode acompanhar o status na aba de pedidos.');
    clearCart();
    setCurrentScreen('my-orders');
  };

  const handleAddDrink = (drink: typeof drinks[0]) => {
    const drinkItem: Omit<CartItem, 'quantity'> = {
      id: drink.id,
      name: drink.name,
      image: drink.image,
      price: drink.price,
      type: 'drink',
    };
    addToCart(drinkItem);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-8">
        <div className="container mx-auto px-4">
          <button onClick={() => setCurrentScreen('home')} className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gold-old mb-4">Carrinho Vazio</h2>
            <p className="text-gold-old-light mb-6">Adicione algumas pizzas deliciosas ao seu carrinho!</p>
            <button onClick={() => setCurrentScreen('home')} className="bg-gold-old text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors">
              Ver Cardápio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button onClick={() => setCurrentScreen('home')} className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <h2 className="text-2xl font-bold text-gold-old mb-6">Meu Carrinho</h2>

        {!user && (
          <div className="bg-gold-old/10 border border-gold-old rounded-lg p-4 mb-6">
            <p className="text-gold-old text-center">
              <strong>Atenção:</strong> Você precisa estar logado para finalizar o pedido.{' '}
              <button onClick={() => setCurrentScreen('login')} className="text-gold-old-light hover:text-gold-old underline font-semibold">
                Fazer login agora
              </button>
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gold-old">Itens</h3>
              {cartItems.map((item) => (
                <div key={item.id} className="bg-black border border-gold-old rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/100x100/1a1a1a/c79845?text=Item'; }}/>
                    <div className="flex-1">
                      <h4 className="font-bold text-gold-old">{item.name}</h4>
                      <p className="text-gold-old-light text-sm">{item.size || item.description}</p>
                      <p className="text-gold-old font-semibold">R$ {item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-gold-old text-black rounded-full flex items-center justify-center hover:bg-gold-old-light"><Minus className="w-4 h-4" /></button>
                      <span className="text-gold-old font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-gold-old text-black rounded-full flex items-center justify-center hover:bg-gold-old-light"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-400 p-2"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gold-old mb-4 flex items-center"><GlassWater className="mr-2"/>Bebidas para acompanhar</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {drinks.map(drink => (
                  <div key={drink.id} className="bg-black border border-gold-old rounded-lg p-2 text-center">
                    <img src={drink.image} alt={drink.name} className="w-full h-20 object-cover rounded-md mb-2" />
                    <p className="text-gold-old text-sm font-semibold">{drink.name}</p>
                    <p className="text-gold-old-light text-xs mb-2">R$ {drink.price.toFixed(2)}</p>
                    <button onClick={() => handleAddDrink(drink)} className="w-full bg-gold-old text-black text-xs py-1 rounded-md font-semibold hover:bg-gold-old-light">Adicionar</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gold-old text-black p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-xl">R$ {total.toFixed(2)}</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gold-old">Pagamento</h3>
            <div className="bg-black border border-gold-old rounded-lg p-4">
              <h4 className="font-bold text-gold-old mb-4">Forma de Pagamento</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer"><input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod['type'])} className="text-gold-old"/><Smartphone className="w-5 h-5 text-gold-old" /><span className="text-gold-old">PIX</span></label>
                <label className="flex items-center space-x-3 cursor-pointer"><input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod['type'])} className="text-gold-old"/><CreditCard className="w-5 h-5 text-gold-old" /><span className="text-gold-old">Cartão de Crédito</span></label>
                <label className="flex items-center space-x-3 cursor-pointer"><input type="radio" name="payment" value="debit" checked={paymentMethod === 'debit'} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod['type'])} className="text-gold-old"/><CreditCard className="w-5 h-5 text-gold-old" /><span className="text-gold-old">Cartão de Débito</span></label>
              </div>
            </div>

            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
              <div className="bg-black border border-gold-old rounded-lg p-4">
                <h4 className="font-bold text-gold-old mb-4">Dados do Cartão</h4>
                <div className="space-y-4">
                  <input type="text" placeholder="Número do cartão" value={cardData.number} onChange={(e) => setCardData({...cardData, number: e.target.value})} className="w-full px-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"/>
                  <input type="text" placeholder="Nome no cartão" value={cardData.holder} onChange={(e) => setCardData({...cardData, holder: e.target.value})} className="w-full px-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"/>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/AA" value={cardData.expiry} onChange={(e) => setCardData({...cardData, expiry: e.target.value})} className="px-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"/>
                    <input type="text" placeholder="CVV" value={cardData.cvv} onChange={(e) => setCardData({...cardData, cvv: e.target.value})} className="px-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"/>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'pix' && (
              <div className="bg-gold-old/10 border border-gold-old rounded-lg p-4">
                <p className="text-gold-old text-sm">🔐 Após confirmar o pedido, você receberá o código PIX para pagamento.</p>
              </div>
            )}

            <button onClick={handleFinishOrder} className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${user ? 'bg-gold-old text-black hover:bg-gold-old-light' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`} disabled={!user}>
              {user ? `Finalizar Pedido - R$ ${total.toFixed(2)}` : 'Faça login para continuar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
