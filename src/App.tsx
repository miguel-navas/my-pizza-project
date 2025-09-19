import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import CategorySection from './components/CategorySection';
import PromotionSection from './components/PromotionSection';
import Footer from './components/Footer';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import CartScreen from './components/CartScreen';
import MyOrdersScreen from './components/MyOrdersScreen';
import LoyaltyScreen from './components/LoyaltyScreen';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'cart':
        return <CartScreen />;
      case 'my-orders':
        return <MyOrdersScreen />;
      case 'loyalty':
        return <LoyaltyScreen />;
      default:
        return (
          <>
            <main>
              <CategorySection />
              <PromotionSection />
            </main>
            <Footer />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      {renderScreen()}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
