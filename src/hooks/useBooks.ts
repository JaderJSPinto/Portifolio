import React from 'react';
import Papa from 'papaparse';

export interface Book {
  id: string;
  name: string;
  shortDescription: string;
  price: string;
  imageUrl: string;
}

export function useBooks() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Adicionamos um 'cache buster' (?t=...) para garantir que o navegador não use uma versão antiga do arquivo
        const response = await fetch(`books.csv?t=${new Date().getTime()}`);
        if (!response.ok) {
          throw new Error('Não foi possível encontrar o arquivo books.csv na raiz do site.');
        }
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Função auxiliar para encontrar colunas mesmo com nomes levemente diferentes
            const getVal = (row: any, keys: string[]) => {
              const foundKey = Object.keys(row).find(k => 
                keys.some(key => k.toLowerCase().trim() === key.toLowerCase().trim())
              );
              return foundKey ? row[foundKey] : null;
            };

            const parsedBooks = results.data
              .filter((row: any) => {
                const name = getVal(row, ['Name', 'name', 'Nome', 'Título', 'Title']);
                return name && name.toString().trim() !== '';
              })
              .map((row: any) => {
                // WooCommerce costuma usar 'Images' ou 'Image URL'
                const rawImageUrl = getVal(row, ['Images', 'images', 'Image URL', 'image_url', 'Imagem', 'Imagens', 'URL da Imagem']) || '';
                
                // Limpeza profunda da URL da imagem
                // 1. Converte para string e remove aspas
                let firstImageUrl = rawImageUrl.toString().replace(/["']/g, '').trim();
                
                // 2. Se houver várias imagens (separadas por vírgula), pega a primeira
                firstImageUrl = firstImageUrl.split(',')[0].trim();

                // 3. TRATAMENTO WOOCOMMERCE: Se estiver no formato ID|URL (ex: 123|https://...), pega só a URL
                if (firstImageUrl.includes('|')) {
                  const parts = firstImageUrl.split('|');
                  const urlPart = parts.find(p => p.trim().toLowerCase().startsWith('http'));
                  if (urlPart) {
                    firstImageUrl = urlPart.trim();
                  } else {
                    // Se não achou http, pega a última parte (geralmente a URL)
                    firstImageUrl = parts[parts.length - 1].trim();
                  }
                }
                
                // 4. Se a URL for relativa (começa com /wp-content), tenta torná-la absoluta
                if (firstImageUrl && firstImageUrl.startsWith('/')) {
                  if (!firstImageUrl.startsWith('//')) {
                    firstImageUrl = 'https://jdreditora.com.br' + firstImageUrl;
                  } else {
                    firstImageUrl = 'https:' + firstImageUrl;
                  }
                }

                return {
                  id: getVal(row, ['ID', 'id', 'Identificador']) || Math.random().toString(),
                  name: getVal(row, ['Name', 'name', 'Nome', 'Título', 'Title']) || 'Sem Título',
                  shortDescription: getVal(row, ['Short Description', 'short_description', 'Descrição', 'Descrição curta', 'Description']) || '',
                  price: getVal(row, ['Regular price', 'price', 'Preço', 'Valor']) || '0.00',
                  imageUrl: firstImageUrl || '',
                };
              });

            // Ordena do mais novo para o mais velho (ID maior primeiro)
            const sortedBooks = parsedBooks.sort((a, b) => {
              const idA = parseInt(a.id.toString().replace(/\D/g, '')) || 0;
              const idB = parseInt(b.id.toString().replace(/\D/g, '')) || 0;
              return idB - idA;
            });

            if (sortedBooks.length === 0) {
              console.warn('O arquivo CSV foi lido, mas parece estar vazio ou mal formatado.');
            }

            setBooks(sortedBooks);
            setLoading(false);
          },
          error: (err: any) => {
            console.error('Erro no PapaParse:', err);
            setError('Erro ao processar o conteúdo do arquivo CSV.');
            setLoading(false);
          }
        });
      } catch (err: any) {
        console.error('Erro ao buscar CSV:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
}
