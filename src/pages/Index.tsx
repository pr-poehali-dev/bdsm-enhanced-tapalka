import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import ClickerButton from '@/components/ClickerButton';
import UpgradeShop from '@/components/UpgradeShop';
import PremiumDialog from '@/components/PremiumDialog';
import AchievementsDialog from '@/components/AchievementsDialog';

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
          <ClickerButton
            clicks={clicks}
            level={level}
            experience={experience}
            clicksPerSecond={clicksPerSecond}
            comboCount={comboCount}
            criticalHit={criticalHit}
            multiplier={multiplier}
            achievementBonus={achievementBonus}
            achievementsUnlocked={achievements.filter(a => a.unlocked).length}
            achievementsTotal={achievements.length}
            showParticles={showParticles}
            totalClicks={totalClicks}
            premiumBonus={premiumBonus}
            ownedUpgradesCount={ownedUpgrades.reduce((s, u) => s + u.owned, 0)}
            onClick={handleClick}
            onBuyMultiplier={buyMultiplier}
          />

          <UpgradeShop
            upgrades={ownedUpgrades}
            clicks={clicks}
            premiumBonus={premiumBonus}
            achievementBonus={achievementBonus}
            onBuyUpgrade={buyUpgrade}
          />
        </div>
      </div>

      <PremiumDialog
        isOpen={showPremiumDialog}
        onClose={() => setShowPremiumDialog(false)}
        onPurchase={handlePremiumPurchase}
      />

      <AchievementsDialog
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievements={achievements}
      />

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
