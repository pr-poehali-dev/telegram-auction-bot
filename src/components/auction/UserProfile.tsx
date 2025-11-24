import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface BidHistory {
  id: number;
  auctionTitle: string;
  amount: number;
  status: 'active' | 'won' | 'lost';
  date: string;
  emoji: string;
}

const mockBidHistory: BidHistory[] = [
  { id: 1, auctionTitle: 'Премиум Телеграм Гифт', amount: 2500, status: 'active', date: '2024-11-24 15:30', emoji: '🎁' },
  { id: 2, auctionTitle: 'Золотая Звезда VIP', amount: 3000, status: 'won', date: '2024-11-23 18:45', emoji: '⭐' },
  { id: 3, auctionTitle: 'Набор Эмодзи Коллекция', amount: 1500, status: 'lost', date: '2024-11-23 12:20', emoji: '😎' },
  { id: 4, auctionTitle: 'Кристальная Корона', amount: 3600, status: 'active', date: '2024-11-24 14:15', emoji: '👑' },
  { id: 5, auctionTitle: 'Магический Артефакт', amount: 2200, status: 'won', date: '2024-11-22 20:10', emoji: '✨' },
];

const UserProfile = () => {
  const userStats = {
    username: '@my_account',
    balance: 15000,
    totalBids: 47,
    activeBids: 2,
    wonAuctions: 8,
    totalSpent: 24000,
    reserved: 6100,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-500 text-white font-semibold">⏳ Активна</Badge>;
      case 'won':
        return <Badge className="bg-green-500 text-white font-semibold">🏆 Выиграно</Badge>;
      case 'lost':
        return <Badge className="bg-gray-400 text-white font-semibold">Проиграно</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white border-none shadow-2xl animate-scale-in">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
            <AvatarFallback className="text-5xl bg-gradient-to-br from-yellow-300 to-orange-400">
              🎯
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black mb-2">{userStats.username}</h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Badge className="bg-white/20 backdrop-blur text-white font-semibold px-3 py-1">
                Ранг: #12
              </Badge>
              <Badge className="bg-white/20 backdrop-blur text-white font-semibold px-3 py-1">
                💎 VIP
              </Badge>
            </div>
          </div>

          <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6 border-2 border-white/30">
            <div className="text-sm font-medium mb-2 text-white/90">Баланс</div>
            <div className="text-4xl font-black flex items-center gap-2 justify-center">
              {userStats.balance.toLocaleString()}
              <span className="text-3xl animate-pulse-star">⭐</span>
            </div>
            <Button variant="secondary" size="sm" className="mt-3 font-semibold">
              <Icon name="Plus" size={16} className="mr-1" />
              Пополнить
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-blue-50 border-2 border-blue-200">
          <Icon name="MousePointerClick" className="mx-auto mb-2 text-blue-500" size={32} />
          <div className="text-3xl font-black text-blue-700 mb-1">{userStats.totalBids}</div>
          <div className="text-sm font-medium text-blue-600">Всего ставок</div>
        </Card>

        <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-orange-50 border-2 border-orange-200">
          <Icon name="Activity" className="mx-auto mb-2 text-orange-500" size={32} />
          <div className="text-3xl font-black text-orange-700 mb-1">{userStats.activeBids}</div>
          <div className="text-sm font-medium text-orange-600">Активных</div>
        </Card>

        <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-green-50 border-2 border-green-200">
          <Icon name="Trophy" className="mx-auto mb-2 text-green-500" size={32} />
          <div className="text-3xl font-black text-green-700 mb-1">{userStats.wonAuctions}</div>
          <div className="text-sm font-medium text-green-600">Побед</div>
        </Card>

        <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-purple-50 border-2 border-purple-200">
          <Icon name="Lock" className="mx-auto mb-2 text-purple-500" size={32} />
          <div className="text-3xl font-black text-purple-700 mb-1">{userStats.reserved.toLocaleString()}</div>
          <div className="text-sm font-medium text-purple-600">Заморожено ⭐</div>
        </Card>
      </div>

      <Card className="p-6 bg-white/90 backdrop-blur border-2">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            📜 История ставок
          </h3>
          <Button variant="outline" size="sm" className="font-semibold">
            <Icon name="Download" size={16} className="mr-2" />
            Экспорт
          </Button>
        </div>

        <div className="space-y-3">
          {mockBidHistory.map((bid, index) => (
            <div
              key={bid.id}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-100 hover:border-purple-300 transition-all animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{bid.emoji}</div>
                <div>
                  <div className="font-semibold text-foreground">{bid.auctionTitle}</div>
                  <div className="text-sm text-muted-foreground">{bid.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-lg text-purple-600">
                    {bid.amount.toLocaleString()} ⭐
                  </div>
                </div>
                {getStatusBadge(bid.status)}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" className="font-semibold">
            <Icon name="ChevronDown" size={16} className="mr-2" />
            Загрузить ещё
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
