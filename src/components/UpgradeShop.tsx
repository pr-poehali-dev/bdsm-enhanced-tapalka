import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Upgrade {
  id: number;
  name: string;
  cost: number;
  cps: number;
  owned: number;
  icon: string;
}

interface UpgradeShopProps {
  upgrades: Upgrade[];
  clicks: number;
  premiumBonus: number;
  achievementBonus: number;
  onBuyUpgrade: (upgradeId: number) => void;
}

const UpgradeShop = ({ upgrades, clicks, premiumBonus, achievementBonus, onBuyUpgrade }: UpgradeShopProps) => {
  return (
    <div>
      <Card className="bg-zinc-900/90 border-red-900/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4 text-red-600 flex items-center gap-2">
            <Icon name="ShoppingCart" size={20} />
            Магазин
          </h2>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {upgrades.map(upgrade => {
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
                  onClick={() => canBuy && onBuyUpgrade(upgrade.id)}
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
  );
};

export default UpgradeShop;
