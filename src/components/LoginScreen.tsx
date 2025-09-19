import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoginScreen: React.FC = () => {
  const { setUser, setCurrentScreen } = useApp();
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      id: '1',
      name: 'João Silva',
      email: formData.email || 'joao@email.com',
      phone: formData.phone,
      loyaltyPoints: 125,
      largePizzasPurchased: 5,
      largePizzasRewardAvailable: false,
    };
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleSocialLogin = (provider: string) => {
    const userData = {
      id: '1',
      name: 'João Silva',
      email: 'joao@email.com',
      loyaltyPoints: 125,
      largePizzasPurchased: 5,
      largePizzasRewardAvailable: false,
    };
    setUser(userData);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4 max-w-md">
        <button
          onClick={() => setCurrentScreen('home')}
          className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="bg-black border border-gold-old rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gold-old text-center mb-6">
            Entrar na Conta
          </h2>

          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Continuar com Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Continuar com Facebook
            </button>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gold-old"></div>
            <span className="px-4 text-gold-old">ou</span>
            <div className="flex-1 border-t border-gold-old"></div>
          </div>

          <div className="flex bg-gold-old rounded-lg p-1 mb-4">
            <button
              onClick={() => setLoginType('email')}
              className={`flex-1 py-2 rounded-md font-semibold transition-colors ${
                loginType === 'email' 
                  ? 'bg-black text-gold-old' 
                  : 'text-black hover:bg-black/10'
              }`}
            >
              E-mail
            </button>
            <button
              onClick={() => setLoginType('phone')}
              className={`flex-1 py-2 rounded-md font-semibold transition-colors ${
                loginType === 'phone' 
                  ? 'bg-black text-gold-old' 
                  : 'text-black hover:bg-black/10'
              }`}
            >
              Telefone
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginType === 'email' ? (
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                  required
                />
              </div>
            ) : (
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
                <input
                  type="tel"
                  placeholder="Seu telefone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
              <input
                type="password"
                placeholder="Sua senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-old text-black py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gold-old-light">
              Não tem uma conta?{' '}
              <button
                onClick={() => setCurrentScreen('register')}
                className="text-gold-old hover:text-gold-old-light font-semibold"
              >
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
