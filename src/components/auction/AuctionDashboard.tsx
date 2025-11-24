import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import BidDialog from './BidDialog';

interface Auction {
  id: number;
  title: string;
  description: string;
  currentBid: number;
  startPrice: number;
  maxBid: number;
  bidIncrement: number;
  timeLeft: string;
  totalBids: number;
  leader: string;
  status: 'active' | 'ending' | 'completed';
  emoji: string;
}

const mockAuctions: Auction[] = [
  {
    id: 1,
    title: 'Премиум Телеграм Гифт',
    description: 'Эксклюзивный цифровой подарок с уникальной анимацией',
    currentBid: 2500,
    startPrice: 1000,
    maxBid: 5000,
    bidIncrement: 100,
    timeLeft: '2ч 15м',
    totalBids: 47,
    leader: '@crypto_king',
    status: 'active',
    emoji: '🎁',
  },
  {
    id: 2,
    title: 'Золотая Звезда VIP',
    description: 'Редкий VIP-статус на месяц с особыми привилегиями',
    currentBid: 4200,
    startPrice: 2000,
    maxBid: 8000,
    bidIncrement: 200,
    timeLeft: '45м',
    totalBids: 89,
    leader: '@star_hunter',
    status: 'ending',
    emoji: '⭐',
  },
  {
    id: 3,
    title: 'Набор Эмодзи Коллекция',
    description: 'Уникальная коллекция из 50 эксклюзивных эмодзи',
    currentBid: 1800,
    startPrice: 500,
    maxBid: 3000,
    bidIncrement: 50,
    timeLeft: '5ч 30м',
    totalBids: 23,
    leader: '@emoji_lover',
    status: 'active',
    emoji: '😎',
  },
  {
    id: 4,
    title: 'Кристальная Корона',
    description: 'Легендарный артефакт для вашего профиля',
    currentBid: 3600,
    startPrice: 1500,
    maxBid: 6000,
    bidIncrement: 150,
    timeLeft: '1ч 20м',
    totalBids: 65,
    leader: '@crown_collector',
    status: 'ending',
    emoji: '👑',
  },
];

const AuctionDashboard = () => {
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [bidDialogOpen, setBidDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'ending':
        return 'bg-orange-500 animate-pulse-star';
      case 'completed':
        return 'bg-gray-400';
      default:
        return 'bg-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Активен';
      case 'ending':
        return 'Завершается!';
      case 'completed':
        return 'Завершён';
      default:
        return '';
    }
  };

  const handleBidClick = (auction: Auction) => {
    setSelectedAuction(auction);
    setBidDialogOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockAuctions.map((auction, index) => {
          const progress = ((auction.currentBid - auction.startPrice) / (auction.maxBid - auction.startPrice)) * 100;

          return (
            <Card
              key={auction.id}
              className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] animate-slide-up border-2 hover:border-primary/50 bg-white/90 backdrop-blur"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-5xl animate-pulse-star">{auction.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{auction.title}</h3>
                    <p className="text-sm text-muted-foreground">{auction.description}</p>
                  </div>
                </div>
                <Badge className={`${getStatusColor(auction.status)} text-white font-semibold px-3 py-1`}>
                  {getStatusText(auction.status)}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Прогресс торгов</span>
                  <span className="font-semibold text-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3 bg-muted" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-xs text-purple-600 font-medium mb-1">Текущая ставка</div>
                    <div className="text-2xl font-black text-purple-700 flex items-center gap-1">
                      {auction.currentBid.toLocaleString()}
                      <span className="text-sm">⭐</span>
                    </div>
                  </div>
                  <div className="bg-pink-50 rounded-lg p-3">
                    <div className="text-xs text-pink-600 font-medium mb-1">Макс. ставка</div>
                    <div className="text-2xl font-black text-pink-700 flex items-center gap-1">
                      {auction.maxBid.toLocaleString()}
                      <span className="text-sm">⭐</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-b border-muted">
                  <div className="flex items-center gap-2">
                    <Icon name="Trophy" className="text-yellow-500" size={20} />
                    <span className="text-sm font-medium text-foreground">Лидер:</span>
                    <span className="text-sm font-bold text-primary">{auction.leader}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Users" className="text-blue-500" size={18} />
                    <span className="text-sm font-semibold text-foreground">{auction.totalBids} ставок</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" className="text-orange-500 animate-pulse" size={20} />
                    <span className="text-sm font-bold text-orange-600">{auction.timeLeft}</span>
                  </div>
                  <Button
                    onClick={() => handleBidClick(auction)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-6 shadow-lg hover:shadow-xl transition-all"
                  >
                    <Icon name="Zap" size={16} className="mr-2" />
                    Сделать ставку
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedAuction && (
        <BidDialog
          auction={selectedAuction}
          open={bidDialogOpen}
          onOpenChange={setBidDialogOpen}
        />
      )}
    </>
  );
};

export default AuctionDashboard;
