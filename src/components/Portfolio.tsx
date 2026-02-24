import React from 'react';
import { useBooks, type Book } from '@/hooks/useBooks';
import { motion } from 'motion/react';
import { Search, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface PortfolioProps {
  limit?: number;
  showAll?: boolean;
  onShowMore?: () => void;
}

// Função para limpar tags HTML das descrições (movida para fora para evitar recriação)
const stripHtml = (html: string) => {
  if (typeof document === 'undefined') return html;
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

function BookCard({ book, index }: { book: Book; index: number; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-slate-100 group"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-100">
        <img
          src={book.imageUrl || 'https://via.placeholder.com/300x450?text=Sem+Imagem'}
          alt={`Capa do livro ${book.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="eager"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('placeholder')) {
              // Tenta uma última vez sem o crossOrigin se falhar
              target.removeAttribute('crossorigin');
              target.src = book.imageUrl + '?v=' + new Date().getTime();
              
              // Se falhar de novo, aí sim vai para o placeholder
              target.onerror = () => {
                target.src = 'https://via.placeholder.com/300x450?text=Capa+Indispon%C3%ADvel';
              };
            }
          }}
        />
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/40 transition-colors duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Ver Detalhes
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-serif font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors" title={book.name}>
          {book.name}
        </h3>
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
          {stripHtml(book.shortDescription)}
        </p>
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Preço</span>
            <span className="text-amber-600 font-black text-xl">
              R$ {book.price.includes(',') ? book.price : parseFloat(book.price).toFixed(2).replace('.', ',')}
            </span>
          </div>
          <div className="bg-slate-100 px-3 py-1 rounded text-[10px] font-black uppercase text-slate-500 tracking-tighter">
            E-book
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio({ limit, showAll = false, onShowMore }: PortfolioProps) {
  const { books, loading, error } = useBooks();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  const filteredBooks = React.useMemo(() => {
    return books.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  // Se tiver um limite (Home), pega apenas os primeiros N
  const displayedBooks = React.useMemo(() => {
    if (limit && !showAll) {
      return filteredBooks.slice(0, limit);
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, limit, showAll, currentPage]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Erro ao carregar livros: {error}
      </div>
    );
  }

  return (
    <section id="portfolio" className={`py-20 ${showAll ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            {showAll ? 'Todos os Meus E-books' : 'Lançamentos Recentes'}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {showAll 
              ? `Explore minha coleção completa de ${books.length} obras voltadas para o crescimento espiritual.`
              : 'Confira as obras mais recentes publicadas pela JDR Editora.'}
          </p>
        </div>

        {showAll && (
          <div className="max-w-md mx-auto mb-12 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-full leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition duration-150 ease-in-out shadow-sm"
              placeholder="Buscar por título ou descrição..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        {displayedBooks.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            Nenhum livro encontrado.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedBooks.map((book, index) => (
                <BookCard key={book.id} book={book} index={index} />
              ))}
            </div>

            {/* Paginação para a página de Portfólio */}
            {showAll && totalPages > 1 && (
              <div className="mt-16 flex flex-wrap justify-center items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo(0, 0);
                  }}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {/* Números das páginas */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Lógica simples para mostrar páginas próximas à atual
                  let pageNum = currentPage;
                  if (currentPage <= 3) pageNum = i + 1;
                  else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                  else pageNum = currentPage - 2 + i;

                  if (pageNum <= 0 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo(0, 0);
                      }}
                      className={`w-10 h-10 rounded-lg border font-bold transition-all ${
                        currentPage === pageNum
                          ? 'bg-amber-600 border-amber-600 text-white shadow-md'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    window.scrollTo(0, 0);
                  }}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Botão "Ver Todos" para a Home */}
            {!showAll && onShowMore && books.length > limit! && (
              <div className="mt-16 text-center">
                <button
                  onClick={onShowMore}
                  className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl group"
                >
                  Ver Portfólio Completo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
