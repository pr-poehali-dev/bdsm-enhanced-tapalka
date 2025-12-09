import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [clicks, setClicks] = useState(0);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [showParticles, setShowParticles] = useState<{id: number, x: number, y: number}[]>([]);

  const upgrades = [
    { id: 1, name: 'Ассистент', cost: 10, cps: 0.1, owned: 0 },
    { id: 2, name: 'Мастер', cost: 50, cps: 0.5, owned: 0 },
    { id: 3, name: 'Доминатор', cost: 200, cps: 2, owned: 0 },
    { id: 4, name: 'Легенда', cost: 1000, cps: 10, owned: 0 },
  ];

  const [ownedUpgrades, setOwnedUpgrades] = useState(upgrades);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalCps = ownedUpgrades.reduce((sum, upgrade) => sum + (upgrade.cps * upgrade.owned), 0);
      setClicksPerSecond(totalCps);
      if (totalCps > 0) {
        setClicks(prev => prev + totalCps);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ownedUpgrades]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClicks(prev => prev + (1 * multiplier));
    
    const particleId = Date.now() + Math.random();
    setShowParticles(prev => [...prev, { id: particleId, x, y }]);
    
    setTimeout(() => {
      setShowParticles(prev => prev.filter(p => p.id !== particleId));
    }, 1000);
  };

  const buyUpgrade = (upgradeId: number) => {
    const upgrade = ownedUpgrades.find(u => u.id === upgradeId);
    if (!upgrade) return;

    const cost = Math.floor(upgrade.cost * Math.pow(1.15, upgrade.owned));
    
    if (clicks >= cost) {
      setClicks(prev => prev - cost);
      setOwnedUpgrades(prev => prev.map(u => 
        u.id === upgradeId 
          ? { ...u, owned: u.owned + 1 }
          : u
      ));
    }
  };

  const buyMultiplier = () => {
    const cost = multiplier * 500;
    if (clicks >= cost) {
      setClicks(prev => prev - cost);
      setMultiplier(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-black text-red-600 tracking-tighter mb-2 animate-scale-in">
            ERIC SEX
          </h1>
          <p className="text-red-500/60 text-xl tracking-[0.2em] uppercase">Clicker Game</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          <div className="space-y-6">
            <Card className="bg-zinc-900/80 border-red-900/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-red-600 mb-2">
                    {Math.floor(clicks).toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {clicksPerSecond.toFixed(1)} очков/сек
                  </div>
                </div>

                <div className="relative">
                  <Button
                    onClick={handleClick}
                    className="w-full h-64 bg-gradient-to-br from-red-600 to-red-900 hover:from-red-700 hover:to-red-950 text-white text-4xl font-black transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl shadow-red-600/50 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300" />
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <Icon name="Flame" size={64} className="animate-pulse" />
                      <span>КЛИКНИ</span>
                    </div>
                    {showParticles.map(particle => (
                      <div
                        key={particle.id}
                        className="absolute text-red-400 font-bold pointer-events-none animate-fade-in"
                        style={{
                          left: particle.x,
                          top: particle.y,
                          animation: 'floatUp 1s ease-out forwards'
                        }}
                      >
                        +{multiplier}
                      </div>
                    ))}
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-red-950/30 rounded-lg border border-red-900/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">Множитель кликов</div>
                      <div className="text-sm text-gray-400">Текущий: x{multiplier}</div>
                    </div>
                    <Button
                      onClick={buyMultiplier}
                      disabled={clicks < multiplier * 500}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Купить x{multiplier + 1}
                      <br />
                      <span className="text-xs">({(multiplier * 500).toLocaleString()} очков)</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/80 border-red-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center gap-2">
                  <Icon name="TrendingUp" size={24} />
                  Статистика
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                    <span className="text-gray-400">Всего кликов:</span>
                    <span className="font-bold text-white">{Math.floor(clicks).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                    <span className="text-gray-400">В секунду:</span>
                    <span className="font-bold text-red-600">{clicksPerSecond.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                    <span className="text-gray-400">Множитель:</span>
                    <span className="font-bold text-red-600">x{multiplier}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-zinc-900/80 border-red-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-2">
                  <Icon name="ShoppingCart" size={24} />
                  Улучшения
                </h2>

                <div className="space-y-3">
                  {ownedUpgrades.map(upgrade => {
                    const cost = Math.floor(upgrade.cost * Math.pow(1.15, upgrade.owned));
                    const canBuy = clicks >= cost;

                    return (
                      <div
                        key={upgrade.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          canBuy 
                            ? 'bg-red-950/30 border-red-600 hover:border-red-500 hover:scale-[1.02] cursor-pointer' 
                            : 'bg-black/30 border-red-900/30 opacity-50'
                        }`}
                        onClick={() => canBuy && buyUpgrade(upgrade.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-lg">{upgrade.name}</div>
                            <div className="text-sm text-gray-400">
                              +{upgrade.cps.toFixed(1)} очков/сек
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black text-red-600">
                              {cost.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              Куплено: {upgrade.owned}
                            </div>
                          </div>
                        </div>

                        {upgrade.owned > 0 && (
                          <div className="mt-2 pt-2 border-t border-red-900/30">
                            <div className="text-sm text-gray-400">
                              Производит: <span className="text-red-600 font-semibold">
                                {(upgrade.cps * upgrade.owned).toFixed(1)} очков/сек
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-red-950/50 to-black rounded-lg border border-red-900/50">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-400">
                      Покупайте улучшения, чтобы автоматически получать очки каждую секунду. 
                      Цена растёт с каждой покупкой!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
