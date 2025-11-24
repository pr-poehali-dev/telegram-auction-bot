import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Leader {
  id: number;
  username: string;
  totalBids: number;
  totalSpent: number;
  wins: number;
  rank: number;
  avatar: string;
}

const mockLeaders: Leader[] = [
  { id: 1, username: '@crypto_king', totalBids: 234, totalSpent: 45000, wins: 12, rank: 1, avatar: '👑' },
  { id: 2, username: '@star_hunter', totalBids: 189, totalSpent: 38000, wins: 9, rank: 2, avatar: '⭐' },
  { id: 3, username: '@emoji_lover', totalBids: 156, totalSpent: 32000, wins: 8, rank: 3, avatar: '😎' },
  { id: 4, username: '@crown_collector', totalBids: 143, totalSpent: 28000, wins: 7, rank: 4, avatar: '💎' },
  { id: 5, username: '@gift_master', totalBids: 128, totalSpent: 25000, wins: 6, rank: 5, avatar: '🎁' },
  { id: 6, username: '@bid_champion', totalBids: 112, totalSpent: 22000, wins: 5, rank: 6, avatar: '🏆' },
  { id: 7, username: '@lucky_winner', totalBids: 98, totalSpent: 19000, wins: 4, rank: 7, avatar: '🍀' },
  { id: 8, username: '@pro_bidder', totalBids: 87, totalSpent: 16000, wins: 3, rank: 8, avatar: '🔥' },
];

const LeaderBoard = () => {
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-purple-400 to-pink-500';
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          👑 Топ Игроков
        </h2>
        <p className="text-muted-foreground">Самые активные участники аукционов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {mockLeaders.slice(0, 3).map((leader, index) => (
          <Card
            key={leader.id}
            className={`p-6 text-center bg-gradient-to-br ${getRankColor(
              leader.rank
            )} text-white animate-scale-in hover:scale-105 transition-transform`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-6xl mb-3 animate-pulse-star">{leader.avatar}</div>
            <div className="text-5xl font-black mb-2">{getRankBadge(leader.rank)}</div>
            <div className="text-xl font-bold mb-4">{leader.username}</div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Icon name="Trophy" size={18} />
                <span className="font-semibold">{leader.wins} побед</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Icon name="Star" size={18} />
                <span className="font-semibold">{leader.totalSpent.toLocaleString()} ⭐</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden border-2 bg-white/90 backdrop-blur">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <tr>
                <th className="px-6 py-4 text-left font-bold">Ранг</th>
                <th className="px-6 py-4 text-left font-bold">Игрок</th>
                <th className="px-6 py-4 text-center font-bold">Ставок</th>
                <th className="px-6 py-4 text-center font-bold">Потрачено</th>
                <th className="px-6 py-4 text-center font-bold">Побед</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaders.map((leader, index) => (
                <tr
                  key={leader.id}
                  className={`border-b hover:bg-purple-50 transition-colors ${
                    index < 3 ? 'bg-yellow-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <Badge
                      className={`font-bold text-white bg-gradient-to-r ${getRankColor(
                        leader.rank
                      )} px-3 py-1`}
                    >
                      {getRankBadge(leader.rank)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-purple-300">
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-100 to-pink-100">
                          {leader.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-foreground">{leader.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="MousePointerClick" className="text-blue-500" size={18} />
                      <span className="font-semibold text-foreground">{leader.totalBids}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-bold text-purple-600">
                        {leader.totalSpent.toLocaleString()}
                      </span>
                      <span className="text-lg">⭐</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Trophy" className="text-yellow-500" size={18} />
                      <span className="font-bold text-orange-600">{leader.wins}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        🔄 Обновляется в реальном времени
      </div>
    </div>
  );
};

export default LeaderBoard;
