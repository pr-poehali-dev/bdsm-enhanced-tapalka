import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Achievement {
  id: number;
  name: string;
  description: string;
  requirement: number;
  unlocked: boolean;
  bonus: number;
}

interface AchievementsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

const AchievementsDialog = ({ isOpen, onClose, achievements }: AchievementsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
  );
};

export default AchievementsDialog;
