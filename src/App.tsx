import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  const [view, setView] = React.useState<'home' | 'portfolio'>('home');

  const navigateTo = (newView: 'home' | 'portfolio') => {
    setView(newView);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
      <Navbar currentView={view} navigateTo={navigateTo} />
      
      {view === 'home' ? (
        <>
          <Hero onViewPortfolio={() => navigateTo('portfolio')} />
          <About />
          <Portfolio limit={4} onShowMore={() => navigateTo('portfolio')} />
          <Contact />
        </>
      ) : (
        <div className="pt-24">
          <Portfolio showAll />
          <div className="container mx-auto px-4 pb-20 text-center">
            <button 
              onClick={() => navigateTo('home')}
              className="text-amber-600 font-medium hover:text-amber-700 transition-colors"
            >
              ← Voltar para a Página Inicial
            </button>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
