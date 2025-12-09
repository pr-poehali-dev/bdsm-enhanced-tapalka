import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Upgrade {
  id: number;
  name: string;
  cost: number;
  cps: number;
  owned: number;
  icon: string;
}

interface Achievement {
  id: number;
  name: string;
  description: string;
  requirement: number;
  unlocked: boolean;
  bonus: number;
}

const Index = () => {
  const [clicks, setClicks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showParticles, setShowParticles] = useState<{id: number, x: number, y: number, value: number}[]>([]);
  const [criticalHit, setCriticalHit] = useState(false);

  const initialUpgrades: Upgrade[] = [
    { id: 1, name: 'Новичок', cost: 15, cps: 0.1, owned: 0, icon: 'User' },
    { id: 2, name: 'Ученик', cost: 100, cps: 1, owned: 0, icon: 'GraduationCap' },
    { id: 3, name: 'Мастер', cost: 500, cps: 5, owned: 0, icon: 'Award' },
    { id: 4, name: 'Эксперт', cost: 2000, cps: 20, owned: 0, icon: 'Target' },
    { id: 5, name: 'Легенда', cost: 10000, cps: 100, owned: 0, icon: 'Crown' },
    { id: 6, name: 'Бог', cost: 50000, cps: 500, owned: 0, icon: 'Sparkles' },
  ];

  const [ownedUpgrades, setOwnedUpgrades] = useState<Upgrade[]>(initialUpgrades);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 1, name: 'Первый клик', description: 'Сделай свой первый клик', requirement: 1, unlocked: false, bonus: 1.1 },
    { id: 2, name: 'Сотня!', description: 'Набери 100 очков', requirement: 100, unlocked: false, bonus: 1.15 },
    { id: 3, name: 'Тысяча!', description: 'Набери 1000 очков', requirement: 1000, unlocked: false, bonus: 1.2 },
    { id: 4, name: 'Кликер', description: 'Сделай 100 кликов', requirement: 100, unlocked: false, bonus: 1.25 },
    { id: 5, name: 'Маньяк', description: 'Сделай 1000 кликов', requirement: 1000, unlocked: false, bonus: 1.5 },
    { id: 6, name: 'Миллионер', description: 'Набери 1,000,000 очков', requirement: 1000000, unlocked: false, bonus: 2 },
  ]);

  const premiumBonus = isPremium ? 3 : 1;
  const achievementBonus = achievements.filter(a => a.unlocked).reduce((acc, a) => acc * a.bonus, 1);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalCps = ownedUpgrades.reduce((sum, upgrade) => sum + (upgrade.cps * upgrade.owned), 0);
      const finalCps = totalCps * premiumBonus * achievementBonus;
      setClicksPerSecond(finalCps);
      if (finalCps > 0) {
        setClicks(prev => prev + finalCps);
        setExperience(prev => prev + finalCps * 0.1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ownedUpgrades, premiumBonus, achievementBonus]);

  useEffect(() => {
    const expNeeded = level * 100;
    if (experience >= expNeeded) {
      setLevel(prev => prev + 1);
      setExperience(0);
      setMultiplier(prev => prev + 1);
    }
  }, [experience, level]);

  useEffect(() => {
    setAchievements(prev => prev.map(ach => {
      if (!ach.unlocked) {
        if (ach.requirement <= (ach.id <= 3 ? clicks : totalClicks)) {
          return { ...ach, unlocked: true };
        }
      }
      return ach;
    }));
  }, [clicks, totalClicks]);

  useEffect(() => {
    if (comboCount > 0) {
      const timer = setTimeout(() => setComboCount(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [lastClickTime]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    
    let comboBonus = 1;
    if (timeDiff < 300) {
      setComboCount(prev => prev + 1);
      comboBonus = 1 + (comboCount * 0.1);
    } else {
      setComboCount(1);
    }
    setLastClickTime(now);

    const isCrit = Math.random() < 0.15;
    const critMultiplier = isCrit ? 3 : 1;
    
    if (isCrit) {
      setCriticalHit(true);
      setTimeout(() => setCriticalHit(false), 300);
    }

    const clickValue = Math.floor(1 * multiplier * comboBonus * critMultiplier * premiumBonus * achievementBonus);
    
    setClicks(prev => prev + clickValue);
    setTotalClicks(prev => prev + 1);
    setExperience(prev => prev + clickValue * 0.5);
    
    const particleId = Date.now() + Math.random();
    setShowParticles(prev => [...prev, { id: particleId, x, y, value: clickValue }]);
    
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
      setExperience(prev => prev + 10);
    }
  };

  const buyMultiplier = () => {
    const cost = multiplier * 1000;
    if (clicks >= cost) {
      setClicks(prev => prev - cost);
      setMultiplier(prev => prev + 1);
    }
  };

  const handlePremiumPurchase = () => {
    window.open('https://www.sberbank.com/ru/person/dist_services/sberpay', '_blank');
    setTimeout(() => {
      setIsPremium(true);
      setShowPremiumDialog(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
      
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-center flex-1">
            <h1 className="text-5xl md:text-7xl font-black text-red-600 tracking-tighter mb-1 animate-scale-in">
              ERIC SEX
            </h1>
            <p className="text-red-500/60 text-sm tracking-[0.2em] uppercase">Ultimate Clicker</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowAchievements(true)}
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600/20"
            >
              <Icon name="Trophy" size={20} />
            </Button>
            {!isPremium && (
              <Button 
                onClick={() => setShowPremiumDialog(true)}
                className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold"
              >
                <Icon name="Crown" size={20} className="mr-2" />
                ПРЕМИУМ
              </Button>
            )}
            {isPremium && (
              <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black text-sm py-2 px-4">
                <Icon name="Crown" size={16} className="mr-1" />
                VIP
              </Badge>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-zinc-900/90 border-red-900/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-red-600 mb-1">
                      {Math.floor(clicks).toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-xs">ОЧКИ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-yellow-500 mb-1">
                      {level}
                    </div>
                    <div className="text-gray-400 text-xs">УРОВЕНЬ</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-green-500 mb-1">
                      {clicksPerSecond.toFixed(1)}
                    </div>
                    <div className="text-gray-400 text-xs">ОЧКОВ/СЕК</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Опыт до {level + 1} уровня</span>
                    <span>{Math.floor(experience)}/{level * 100}</span>
                  </div>
                  <Progress value={(experience / (level * 100)) * 100} className="h-2" />
                </div>

                {comboCount > 1 && (
                  <div className="text-center mb-4">
                    <Badge className="bg-yellow-600 text-black text-lg font-bold px-4 py-2 animate-pulse">
                      КОМБО x{comboCount}!
                    </Badge>
                  </div>
                )}

                <div className="relative flex justify-center">
                  <Button
                    onClick={handleClick}
                    className={`relative w-72 h-72 rounded-full bg-gradient-to-br from-red-600 to-red-900 hover:from-red-700 hover:to-red-950 p-0 transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl overflow-hidden group border-4 ${
                      criticalHit ? 'border-yellow-400 shadow-yellow-400/50' : 'border-red-800'
                    } ${criticalHit ? 'animate-pulse' : ''}`}
                  >
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <img 
                        src="https://unlock-rent.ru/eric.jpg" 
                        alt="Eric"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                        draggable="false"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 group-hover:opacity-50 transition-opacity" />
                    </div>
                    
                    {showParticles.map(particle => (
                      <div
                        key={particle.id}
                        className="absolute text-yellow-400 font-black text-2xl pointer-events-none z-50 drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]"
                        style={{
                          left: particle.x,
                          top: particle.y,
                          animation: 'floatUp 1s ease-out forwards'
                        }}
                      >
                        +{particle.value}
                      </div>
                    ))}
                  </Button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-red-950/30 rounded-lg border border-red-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-bold">Множитель</div>
                        <div className="text-xs text-gray-400">x{multiplier} за клик</div>
                      </div>
                      <Icon name="Zap" size={24} className="text-yellow-500" />
                    </div>
                    <Button
                      onClick={buyMultiplier}
                      disabled={clicks < multiplier * 1000}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-sm"
                      size="sm"
                    >
                      Купить ({(multiplier * 1000).toLocaleString()})
                    </Button>
                  </div>

                  <div className="p-3 bg-purple-950/30 rounded-lg border border-purple-900/50">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-sm font-bold">Бонусы</div>
                        <div className="text-xs text-gray-400">x{achievementBonus.toFixed(1)}</div>
                      </div>
                      <Icon name="Star" size={24} className="text-purple-500" />
                    </div>
                    <div className="text-xs text-gray-400">
                      Разблокировано: {achievements.filter(a => a.unlocked).length}/{achievements.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900/90 border-red-900/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-black/30 rounded text-center">
                    <div className="text-xl font-bold text-white">{totalClicks.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Кликов</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded text-center">
                    <div className="text-xl font-bold text-red-600">{multiplier}x</div>
                    <div className="text-xs text-gray-400">Сила</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded text-center">
                    <div className="text-xl font-bold text-yellow-500">{(premiumBonus * achievementBonus).toFixed(1)}x</div>
                    <div className="text-xs text-gray-400">Бонус</div>
                  </div>
                  <div className="p-3 bg-black/30 rounded text-center">
                    <div className="text-xl font-bold text-green-500">{ownedUpgrades.reduce((s, u) => s + u.owned, 0)}</div>
                    <div className="text-xs text-gray-400">Улучшений</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-zinc-900/90 border-red-900/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
                  <Icon name="ShoppingCart" size={20} />
                  Магазин
                </h2>

                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {ownedUpgrades.map(upgrade => {
                    const cost = Math.floor(upgrade.cost * Math.pow(1.15, upgrade.owned));
                    const canBuy = clicks >= cost;
                    const production = upgrade.cps * upgrade.owned * premiumBonus * achievementBonus;

                    return (
                      <div
                        key={upgrade.id}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                          canBuy 
                            ? 'bg-red-950/40 border-red-600 hover:border-red-500 hover:scale-[1.02]' 
                            : 'bg-black/30 border-red-900/30 opacity-60'
                        }`}
                        onClick={() => canBuy && buyUpgrade(upgrade.id)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-red-600/20 rounded">
                            <Icon name={upgrade.icon} size={20} className="text-red-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-sm">{upgrade.name}</div>
                            <div className="text-xs text-gray-400">
                              {upgrade.cps.toFixed(1)}/сек
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-black text-red-600">
                              {cost.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              ×{upgrade.owned}
                            </div>
                          </div>
                        </div>

                        {upgrade.owned > 0 && (
                          <div className="text-xs text-gray-400 border-t border-red-900/30 pt-2">
                            Даёт: <span className="text-green-500 font-semibold">
                              {production.toFixed(1)}/сек
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent className="bg-zinc-900 border-yellow-600 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center gap-2">
              <Icon name="Crown" size={32} />
              ПРЕМИУМ ВЕРСИЯ
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-base">
              Получите невероятные преимущества!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-4">
            <div className="p-4 bg-gradient-to-r from-yellow-950/50 to-yellow-900/30 rounded-lg border border-yellow-600/50">
              <h3 className="font-bold text-xl mb-3 text-yellow-400">Что входит:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span>× <strong className="text-yellow-400">3 бонус</strong> ко всем очкам</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span>Эксклюзивный <strong className="text-yellow-400">VIP значок</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span>Увеличенные <strong className="text-yellow-400">шансы крита</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-green-500" />
                  <span><strong className="text-yellow-400">Быстрая прокачка</strong> уровней</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-yellow-400 mb-1">300₽</div>
              <div className="text-sm text-gray-400">в месяц</div>
            </div>

            <Button 
              onClick={handlePremiumPurchase}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-black font-bold text-lg py-6"
            >
              <Icon name="CreditCard" size={20} className="mr-2" />
              Оплатить через СБП
            </Button>

            <p className="text-xs text-gray-500 text-center">
              После оплаты через Сбербанк Онлайн премиум активируется автоматически
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAchievements} onOpenChange={setShowAchievements}>
        <DialogContent className="bg-zinc-900 border-red-600 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-red-600 flex items-center gap-2">
              <Icon name="Trophy" size={32} />
              Достижения
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {achievements.map(achievement => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-950/50 to-yellow-900/30 border-yellow-600' 
                    : 'bg-black/30 border-gray-700 opacity-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    name={achievement.unlocked ? 'CheckCircle' : 'Circle'} 
                    size={24} 
                    className={achievement.unlocked ? 'text-yellow-400' : 'text-gray-600'} 
                  />
                  <div className="flex-1">
                    <div className="font-bold text-sm mb-1">{achievement.name}</div>
                    <div className="text-xs text-gray-400 mb-2">{achievement.description}</div>
                    <Badge variant={achievement.unlocked ? 'default' : 'secondary'} className="text-xs">
                      Бонус: x{achievement.bonus}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-120px) scale(1.8);
          }
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
};

export default Index;
