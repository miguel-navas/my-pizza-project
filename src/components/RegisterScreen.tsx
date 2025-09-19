import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

const RegisterScreen: React.FC = () => {
  const { setUser, setCurrentScreen } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    const userData = {
      id: '1',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      loyaltyPoints: 0,
      largePizzasPurchased: 0,
      largePizzasRewardAvailable: false,
    };
    setUser(userData);
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4 max-w-md">
        <button
          onClick={() => setCurrentScreen('login')}
          className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="bg-black border border-gold-old rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gold-old text-center mb-6">
            Criar Conta
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
              <input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
              <input
                type="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
              <input
                type="tel"
                placeholder="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
              <input
                type="password"
                placeholder="Senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gold-old" />
              <input
                type="password"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-black border border-gold-old rounded-lg text-gold-old placeholder-gold-old/60 focus:outline-none focus:border-gold-old-light"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold-old text-black py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors"
            >
              Criar Conta
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gold-old-light">
              Já tem uma conta?{' '}
              <button
                onClick={() => setCurrentScreen('login')}
                className="text-gold-old hover:text-gold-old-light font-semibold"
              >
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
