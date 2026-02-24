import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero({ onViewPortfolio }: { onViewPortfolio: () => void }) {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Biblioteca antiga"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-400 text-sm font-semibold tracking-wider uppercase mb-6 border border-amber-500/30">
            Escritor Cristão & Editor
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight">
            Jader J S Pinto
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
            Compartilhando a fé através da escrita. Mais de 380 obras publicadas em 66 países, levando a mensagem cristã ao mundo.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onViewPortfolio}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-amber-900/20 transform hover:-translate-y-1"
            >
              Ver Portfólio
            </button>
            <a
              href="#about"
              className="px-8 py-4 bg-transparent border border-slate-500 hover:border-white text-slate-300 hover:text-white rounded-full font-medium transition-all duration-300"
            >
              Sobre Mim
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce"
      >
        <a href="#about" className="text-slate-400 hover:text-white transition-colors">
          <ArrowDown size={32} />
        </a>
      </motion.div>
    </section>
  );
}
