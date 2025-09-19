import React from 'react';
import { ArrowLeft, Award, Gift, GlassWater, Pizza } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoyaltyScreen: React.FC = () => {
  const { user, setCurrentScreen, claimLargePizzaReward } = useApp();

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-8">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <button onClick={() => setCurrentScreen('home')} className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          <h2 className="text-2xl font-bold text-gold-old mb-4">Plano de Fidelidade</h2>
          <p className="text-gold-old-light mb-6">Faça login para ver seus pontos e resgatar prêmios!</p>
          <button onClick={() => setCurrentScreen('login')} className="bg-gold-old text-black px-6 py-3 rounded-lg font-semibold hover:bg-gold-old-light transition-colors">
            Fazer Login
          </button>
        </div>
      </div>
    );
  }

  const handleClaimPizzaReward = () => {
    claimLargePizzaReward();
    alert('Parabéns! Adicione uma pizza tradicional (tamanho G) ao seu carrinho, o desconto será aplicado automaticamente.');
  };

  const rewards = [
    { points: 100, name: 'Refrigerante Grátis', icon: <GlassWater className="w-6 h-6" /> },
    { points: 300, name: 'Pizza Doce Pequena', icon: <Gift className="w-6 h-6" /> },
    { points: 500, name: 'Pizza Tradicional Média', icon: <Pizza className="w-6 h-6" /> },
  ];

  const nextReward = rewards.find(r => user.loyaltyPoints < r.points);
  const progress = nextReward ? (user.loyaltyPoints / nextReward.points) * 100 : 100;

  return (
    <div className="min-h-screen bg-black pt-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <button onClick={() => setCurrentScreen('home')} className="flex items-center space-x-2 text-gold-old mb-6 hover:text-gold-old-light">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="text-center mb-8">
          <Award className="w-16 h-16 text-gold-old mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gold-old">Plano de Fidelidade</h2>
          <p className="text-gold-old-light">Acumule pontos e troque por prêmios!</p>
        </div>

        <div className="bg-black border border-gold-old rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gold-old mb-2">Seu Saldo de Pontos</h3>
          <div className="flex items-baseline justify-center space-x-2">
            <span className="text-5xl font-bold text-gold-old">{user.loyaltyPoints}</span>
            <span className="text-gold-old-light">pontos</span>
          </div>
          
          <div className="mt-6">
            <h4 className="text-gold-old font-semibold mb-2">Progresso para o próximo prêmio:</h4>
            <div className="w-full bg-gold-old/20 rounded-full h-4">
              <div className="bg-gold-old h-4 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            {nextReward ? (
              <p className="text-center text-sm text-gold-old-light mt-2">
                Faltam {nextReward.points - user.loyaltyPoints} pontos para um(a) {nextReward.name}!
              </p>
            ) : (
              <p className="text-center text-sm text-green-400 mt-2">
                Você pode resgatar todos os prêmios disponíveis!
              </p>
            )}
          </div>
        </div>

        <div className="bg-black border border-gold-old rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Pizza className="w-10 h-10 text-gold-old" />
            <div>
              <h3 className="text-xl font-bold text-gold-old">Fidelidade Pizza Grande</h3>
              <p className="text-gold-old-light text-sm">A cada 10 pizzas grandes, a próxima tradicional é por nossa conta!</p>
            </div>
          </div>

          <div className="w-full bg-gold-old/20 rounded-full h-4 mb-2">
            <div 
              className="bg-gold-old h-4 rounded-full" 
              style={{ width: `${(user.largePizzasPurchased % 10) * 10}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-gold-old-light mb-4">
            Progresso: {user.largePizzasPurchased % 10} / 10
          </p>

          {user.largePizzasRewardAvailable ? (
            <button 
              onClick={handleClaimPizzaReward}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Gift className="w-5 h-5" />
              <span>Resgatar Pizza Grátis!</span>
            </button>
          ) : (
            <p className="text-center text-gold-old">
              Continue comprando pizzas grandes para ganhar!
            </p>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gold-old mb-4 text-center">Prêmios por Pontos</h3>
          <div className="space-y-4">
            {rewards.map(reward => (
              <div key={reward.points} className={`bg-black border rounded-lg p-4 flex items-center justify-between ${user.loyaltyPoints >= reward.points ? 'border-gold-old' : 'border-gray-600'}`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${user.loyaltyPoints >= reward.points ? 'bg-gold-old/20 text-gold-old' : 'bg-gray-700 text-gray-400'}`}>
                    {reward.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold ${user.loyaltyPoints >= reward.points ? 'text-gold-old' : 'text-gray-400'}`}>{reward.name}</h4>
                    <p className={`text-sm ${user.loyaltyPoints >= reward.points ? 'text-gold-old-light' : 'text-gray-500'}`}>{reward.points} pontos</p>
                  </div>
                </div>
                <button 
                  disabled={user.loyaltyPoints < reward.points}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${user.loyaltyPoints >= reward.points ? 'bg-gold-old text-black hover:bg-gold-old-light' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                >
                  Resgatar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyScreen;
