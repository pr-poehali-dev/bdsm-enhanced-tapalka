import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: 'Sparkles',
      title: 'Премиум качество',
      description: 'Эксклюзивные материалы и безупречное исполнение для ценителей'
    },
    {
      icon: 'Shield',
      title: 'Конфиденциальность',
      description: 'Абсолютная анонимность и защита ваших данных'
    },
    {
      icon: 'Heart',
      title: 'Индивидуальный подход',
      description: 'Персонализированный опыт под ваши желания'
    },
    {
      icon: 'Zap',
      title: 'Быстрая доставка',
      description: 'Мгновенная обработка заказа и оперативная доставка'
    }
  ];

  const gallery = [
    { id: 1, aspect: 'portrait' },
    { id: 2, aspect: 'landscape' },
    { id: 3, aspect: 'square' },
    { id: 4, aspect: 'portrait' },
    { id: 5, aspect: 'landscape' },
    { id: 6, aspect: 'square' }
  ];

  const testimonials = [
    {
      name: 'Анастасия К.',
      text: 'Превзошло все ожидания. Качество на высшем уровне, деликатность и внимание к деталям.',
      rating: 5
    },
    {
      name: 'Дмитрий М.',
      text: 'Профессиональный подход и полная конфиденциальность. Буду обращаться снова.',
      rating: 5
    },
    {
      name: 'Елена В.',
      text: 'Уникальный опыт. Всё строго, стильно и с душой. Рекомендую смелым людям.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Как оформить заказ?',
      answer: 'Свяжитесь с нами через форму на сайте или напрямую по контактам. Мы ответим в течение 1 часа и подберём оптимальный вариант.'
    },
    {
      question: 'Гарантируется ли конфиденциальность?',
      answer: 'Абсолютно. Все данные клиентов защищены, доставка осуществляется в нейтральной упаковке, никаких следов в истории платежей.'
    },
    {
      question: 'Какие способы оплаты доступны?',
      answer: 'Принимаем карты, криптовалюту и наличные. Возможна предоплата или оплата при получении для постоянных клиентов.'
    },
    {
      question: 'Есть ли возврат?',
      answer: 'Мы гарантируем качество. При любых проблемах — обмен или возврат средств в течение 14 дней.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
        
        <div className="relative z-10 text-center max-w-5xl animate-fade-in">
          <div className="mb-8 inline-block">
            <div className="text-red-600 text-7xl md:text-9xl font-black tracking-tighter mb-4 animate-scale-in">
              FORBIDDEN
            </div>
            <div className="text-red-500/60 text-xl md:text-3xl font-light tracking-[0.3em] uppercase">
              Desires Unleashed
            </div>
          </div>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Войдите в мир запретных удовольствий. Элитные аксессуары для тех, кто не боится своих желаний.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50"
            >
              Открыть каталог
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-red-600 text-red-600 hover:bg-red-600/10 px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              Связаться с нами
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-red-600" />
        </div>
      </section>

      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              О НАС
            </span>
          </h2>
          <p className="text-gray-400 text-center text-lg max-w-3xl mx-auto mb-16 leading-relaxed">
            Мы создаём пространство свободы для тех, кто готов исследовать глубины своих желаний. 
            Премиум качество, абсолютная конфиденциальность и индивидуальный подход — наши принципы.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-zinc-900 to-black border-red-900/30 hover:border-red-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20">
              <CardContent className="p-8">
                <Icon name="Flame" size={48} className="text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Страсть без границ</h3>
                <p className="text-gray-400 leading-relaxed">
                  Эксклюзивная коллекция аксессуаров для BDSM практик. От классики до авангарда — 
                  всё для создания незабываемого опыта.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-900 to-black border-red-900/30 hover:border-red-600/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-600/20">
              <CardContent className="p-8">
                <Icon name="Lock" size={48} className="text-red-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Полная приватность</h3>
                <p className="text-gray-400 leading-relaxed">
                  Ваши секреты — под надёжной защитой. Анонимная доставка, зашифрованная переписка, 
                  никаких следов в истории покупок.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-black to-red-950/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              ПРЕИМУЩЕСТВА
            </span>
          </h2>
          <p className="text-gray-400 text-center text-lg max-w-3xl mx-auto mb-16">
            Почему нам доверяют тысячи клиентов по всему миру
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-zinc-900/50 border-red-900/30 hover:border-red-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30 backdrop-blur-sm group"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-block p-4 bg-red-600/10 rounded-full group-hover:bg-red-600/20 transition-all duration-300">
                    <Icon name={feature.icon} size={32} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              ГАЛЕРЕЯ
            </span>
          </h2>
          <p className="text-gray-400 text-center text-lg max-w-3xl mx-auto mb-16">
            Взгляните на нашу коллекцию
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <div 
                key={item.id}
                className={`relative overflow-hidden rounded-lg group cursor-pointer ${
                  item.aspect === 'portrait' ? 'row-span-2' : 
                  item.aspect === 'landscape' ? 'col-span-2' : ''
                }`}
              >
                <div className={`bg-gradient-to-br from-red-950 to-black ${
                  item.aspect === 'portrait' ? 'h-96' : 
                  item.aspect === 'landscape' ? 'h-64' : 'h-64'
                } flex items-center justify-center transition-all duration-500 group-hover:scale-110`}>
                  <Icon name="Image" size={48} className="text-red-600/30 group-hover:text-red-600/60 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                    Подробнее
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-black to-red-950/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              ОТЗЫВЫ
            </span>
          </h2>
          <p className="text-gray-400 text-center text-lg max-w-3xl mx-auto mb-16">
            Что говорят наши клиенты
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-zinc-900/80 border-red-900/30 hover:border-red-600/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-red-600/20 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-red-600 fill-red-600" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 leading-relaxed italic">"{testimonial.text}"</p>
                  <p className="text-red-600 font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              FAQ
            </span>
          </h2>
          <p className="text-gray-400 text-center text-lg mb-16">
            Ответы на частые вопросы
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-zinc-900/50 border border-red-900/30 rounded-lg px-6 hover:border-red-600/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:text-red-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-black via-red-950/20 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              КОНТАКТЫ
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            Готовы сделать первый шаг? Свяжитесь с нами для консультации
          </p>

          <div className="bg-zinc-900/50 border border-red-900/30 rounded-lg p-8 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <Icon name="Mail" size={32} className="text-red-600 mb-2" />
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white font-semibold">info@forbidden.ru</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="Phone" size={32} className="text-red-600 mb-2" />
                <p className="text-sm text-gray-400">Телефон</p>
                <p className="text-white font-semibold">+7 (999) 123-45-67</p>
              </div>
              <div className="flex flex-col items-center">
                <Icon name="MessageCircle" size={32} className="text-red-600 mb-2" />
                <p className="text-sm text-gray-400">Telegram</p>
                <p className="text-white font-semibold">@forbidden_shop</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/50"
            >
              Написать нам
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-red-900/30 bg-black">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2024 FORBIDDEN. Все права защищены. Только для лиц старше 18 лет.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
