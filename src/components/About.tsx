import { motion } from 'motion/react';
import { BookOpen, Globe, Award, Users } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: BookOpen, label: 'E-books Publicados', value: '382+' },
    { icon: Globe, label: 'Países Alcançados', value: '66' },
    { icon: Award, label: 'Anos de Experiência', value: '30+' },
    { icon: Users, label: 'Leitores Impactados', value: 'Milhares' },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="Jader J S Pinto"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-8">
                <p className="text-white font-serif text-xl italic">
                  "Escrever é uma forma de oração, um diálogo com Deus compartilhado com o mundo."
                </p>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-amber-50 rounded-2xl transform rotate-3"></div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6 relative inline-block">
              Sobre Mim
              <span className="absolute bottom-1 left-0 w-1/2 h-1 bg-amber-500 rounded-full"></span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Olá, sou <strong className="text-slate-900">Jader J S Pinto</strong>. Aos 58 anos, dedico minha vida a espalhar a palavra de Deus através da literatura. Como escritor cristão, encontrei na escrita minha vocação e meu ministério.
            </p>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Sou também <strong className="text-slate-900">CEO da JDR Editora</strong>, uma casa editorial comprometida com a excelência e focada exclusivamente no público cristão. Nossa missão é publicar obras que edifiquem, inspirem e transformem vidas. Meus trabalhos estão disponíveis nas maiores plataformas do mundo, como Amazon, Google e Apple, alcançando leitores em diversos continentes.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-slate-50 rounded-lg hover:bg-amber-50 transition-colors duration-300">
                  <div className="bg-white p-3 rounded-full shadow-sm text-amber-600">
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-900">{stat.value}</h4>
                    <p className="text-sm text-slate-500 uppercase tracking-wide font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
