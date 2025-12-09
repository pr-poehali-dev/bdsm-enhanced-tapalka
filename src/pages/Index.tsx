import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Category {
  id: number;
  title: string;
  description: string;
  icon: string;
  count: number;
  gradient: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  badge?: string;
  icon: string;
}

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lockAnimating, setLockAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: Category[] = [
    {
      id: 1,
      title: 'Аренда лицензий',
      description: 'Временный доступ к профессиональному ПО',
      icon: 'Clock',
      count: 12,
      gradient: 'from-purple-600 to-blue-600'
    },
    {
      id: 2,
      title: 'Лицензии навсегда',
      description: 'Полный доступ без ограничений',
      icon: 'Key',
      count: 8,
      gradient: 'from-pink-600 to-purple-600'
    },
    {
      id: 3,
      title: 'Пополнение кредитов',
      description: 'Быстрое пополнение баланса',
      icon: 'CreditCard',
      count: 15,
      gradient: 'from-cyan-600 to-blue-600'
    },
    {
      id: 4,
      title: 'Софт и инструменты',
      description: 'Программы для работы с устройствами',
      icon: 'Laptop',
      count: 20,
      gradient: 'from-violet-600 to-purple-600'
    }
  ];

  const products: Product[] = [
    { id: 1, name: 'iRemove Tools', price: '500₽/мес', category: 'Аренда лицензий', badge: 'Хит', icon: 'Smartphone' },
    { id: 2, name: 'CheckM8', price: '800₽/мес', category: 'Аренда лицензий', icon: 'Cpu' },
    { id: 3, name: 'UnlockTool', price: '1200₽', category: 'Лицензии навсегда', badge: 'Новинка', icon: 'Lock' },
    { id: 4, name: 'FMI OFF', price: '600₽/мес', category: 'Аренда лицензий', icon: 'Shield' },
    { id: 5, name: 'GsmServer Credits', price: 'от 100₽', category: 'Пополнение кредитов', icon: 'DollarSign' },
    { id: 6, name: 'NCK Box Credits', price: 'от 150₽', category: 'Пополнение кредитов', icon: 'Coins' },
    { id: 7, name: 'iTools Full', price: '2500₽', category: 'Софт и инструменты', badge: 'Pro', icon: 'Wrench' },
    { id: 8, name: '3uTools Premium', price: '400₽/мес', category: 'Софт и инструменты', icon: 'Tool' },
  ];

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleLockClick = () => {
    setLockAnimating(true);
    setTimeout(() => setLockAnimating(false), 600);
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory.title)
    : products;

  const searchedProducts = searchQuery
    ? filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredProducts;

  return (
    <div className="min-h-screen bg-[#030014] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMDQsMTY2LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div 
            className="inline-block mb-6 cursor-pointer"
            onClick={handleLockClick}
          >
            <div className={`text-8xl transition-all duration-500 ${lockAnimating ? 'scale-110 rotate-12' : ''}`}>
              {lockAnimating ? '🔓' : '🔒'}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-scale-in">
            UNLOCK-RENT
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Профессиональные решения для разблокировки и ремонта мобильных устройств
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative w-full sm:w-96">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-purple-500/30 focus:border-purple-500 text-white placeholder:text-gray-500 backdrop-blur-sm"
              />
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
              <Icon name="Phone" size={18} className="mr-2" />
              Связаться
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {categories.map((category, index) => (
            <Card
              key={category.id}
              className="group cursor-pointer bg-white/5 border-purple-500/20 hover:border-purple-500/50 backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20"
              onClick={() => handleCategoryClick(category)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${category.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={category.icon} size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {category.count} товаров
                      </Badge>
                      <Icon name="ArrowRight" size={20} className="text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {(selectedCategory || searchQuery) && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {selectedCategory ? selectedCategory.title : 'Результаты поиска'}
              </h2>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
              >
                <Icon name="X" size={18} className="mr-2" />
                Закрыть
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer bg-white/5 border-purple-500/20 hover:border-pink-500/50 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-pink-500/20"
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 group-hover:scale-110 transition-transform">
                        <Icon name={product.icon} size={24} className="text-purple-400" />
                      </div>
                      {product.badge && (
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-purple-400">{product.price}</span>
                      <Icon name="ShoppingCart" size={20} className="text-gray-400 group-hover:text-pink-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchedProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 text-lg">Товары не найдены</p>
              </div>
            )}
          </div>
        )}

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <Icon name="Star" size={48} className="mx-auto mb-4 text-yellow-400" />
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Почему выбирают нас?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h4 className="font-bold mb-2">Быстро</h4>
                <p className="text-gray-400 text-sm">Мгновенная активация лицензий</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🛡️</div>
                <h4 className="font-bold mb-2">Надёжно</h4>
                <p className="text-gray-400 text-sm">100% рабочие решения</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💬</div>
                <h4 className="font-bold mb-2">Поддержка 24/7</h4>
                <p className="text-gray-400 text-sm">Всегда на связи</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="bg-[#0a0520] border-purple-500/30 text-white max-w-md backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center justify-center p-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl">
              <Icon name={selectedProduct?.icon || 'Package'} size={64} className="text-purple-400" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-gray-400">Цена:</span>
                <span className="text-2xl font-black text-purple-400">{selectedProduct?.price}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-gray-400">Категория:</span>
                <Badge className="bg-purple-500/20 text-purple-300">{selectedProduct?.category}</Badge>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="font-bold mb-2">Описание:</h4>
                <p className="text-gray-400 text-sm">
                  Профессиональное решение для работы с мобильными устройствами. 
                  Полная техническая поддержка и обновления включены.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold">
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Заказать
              </Button>
              <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Вопрос
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Index;
