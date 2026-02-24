import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">Jader J S Pinto</h3>
            <p className="text-sm">Escritor Cristão & CEO da JDR Editora</p>
          </div>

          <div className="flex space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors transform hover:scale-110">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors transform hover:scale-110">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors transform hover:scale-110">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-amber-500 transition-colors transform hover:scale-110">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} JDR Editora. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
