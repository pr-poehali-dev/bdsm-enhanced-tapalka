import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface ClickerButtonProps {
  clicks: number;
  level: number;
  experience: number;
  clicksPerSecond: number;
  comboCount: number;
  criticalHit: boolean;
  multiplier: number;
  achievementBonus: number;
  achievementsUnlocked: number;
  achievementsTotal: number;
  showParticles: { id: number; x: number; y: number; value: number }[];
  totalClicks: number;
  premiumBonus: number;
  ownedUpgradesCount: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onBuyMultiplier: () => void;
}

const ClickerButton = ({
  clicks,
  level,
  experience,
  clicksPerSecond,
  comboCount,
  criticalHit,
  multiplier,
  achievementBonus,
  achievementsUnlocked,
  achievementsTotal,
  showParticles,
  totalClicks,
  premiumBonus,
  ownedUpgradesCount,
  onClick,
  onBuyMultiplier,
}: ClickerButtonProps) => {
  return (
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
              onClick={onClick}
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
                onClick={onBuyMultiplier}
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
                Разблокировано: {achievementsUnlocked}/{achievementsTotal}
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
              <div className="text-xl font-bold text-green-500">{ownedUpgradesCount}</div>
              <div className="text-xs text-gray-400">Улучшений</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClickerButton;
