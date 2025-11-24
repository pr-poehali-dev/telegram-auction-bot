import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Auction {
  id: number;
  title: string;
  currentBid: number;
  bidIncrement: number;
  emoji: string;
}

interface BidDialogProps {
  auction: Auction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BidDialog = ({ auction, open, onOpenChange }: BidDialogProps) => {
  const userBalance = 15000;
  const minBid = auction.currentBid + auction.bidIncrement;
  const [bidAmount, setBidAmount] = useState(minBid);

  const handleBidSubmit = () => {
    if (bidAmount < minBid) {
      toast.error(`Минимальная ставка: ${minBid} ⭐`, {
        description: 'Увеличьте сумму ставки',
      });
      return;
    }

    if (bidAmount > userBalance) {
      toast.error('Недостаточно звёзд! 😢', {
        description: `Ваш баланс: ${userBalance} ⭐`,
      });
      return;
    }

    toast.success(`Ставка ${bidAmount} ⭐ принята! 🎉`, {
      description: 'Ожидайте результатов аукциона',
      icon: '🔥',
    });
    
    onOpenChange(false);
  };

  const handleQuickBid = (amount: number) => {
    setBidAmount(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-purple-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black flex items-center gap-3">
            <span className="text-4xl">{auction.emoji}</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Сделать ставку
            </span>
          </DialogTitle>
          <DialogDescription className="text-base">
            {auction.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-700">Ваш баланс</span>
              <Icon name="Wallet" className="text-blue-500" size={20} />
            </div>
            <div className="text-3xl font-black text-blue-700 flex items-center gap-2">
              {userBalance.toLocaleString()}
              <span className="text-2xl animate-pulse-star">⭐</span>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-purple-700">Текущая ставка</span>
              <span className="text-2xl font-black text-purple-700">
                {auction.currentBid.toLocaleString()} ⭐
              </span>
            </div>
            <div className="text-xs text-purple-600 font-medium">
              Минимальная ставка: {minBid.toLocaleString()} ⭐
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="bidAmount" className="text-base font-semibold">
              Ваша ставка
            </Label>
            <div className="relative">
              <Input
                id="bidAmount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                min={minBid}
                max={userBalance}
                className="text-2xl font-bold h-14 pr-12 text-center border-2"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">⭐</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              onClick={() => handleQuickBid(minBid)}
              className="border-2 hover:bg-purple-100 hover:border-purple-400 font-semibold"
            >
              Мин.
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickBid(minBid + auction.bidIncrement * 2)}
              className="border-2 hover:bg-pink-100 hover:border-pink-400 font-semibold"
            >
              +{auction.bidIncrement * 2}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickBid(minBid + auction.bidIncrement * 5)}
              className="border-2 hover:bg-blue-100 hover:border-blue-400 font-semibold"
            >
              +{auction.bidIncrement * 5}
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2 font-semibold"
            >
              Отмена
            </Button>
            <Button
              onClick={handleBidSubmit}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-xl"
            >
              <Icon name="Zap" size={20} className="mr-2" />
              Поставить
            </Button>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            💡 Ставка будет зарезервирована до завершения аукциона
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BidDialog;
