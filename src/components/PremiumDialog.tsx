import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface PremiumDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: () => void;
}

const PremiumDialog = ({ isOpen, onClose, onPurchase }: PremiumDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            onClick={onPurchase}
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
  );
};

export default PremiumDialog;
