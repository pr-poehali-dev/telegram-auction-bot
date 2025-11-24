import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuctionDashboard from '@/components/auction/AuctionDashboard';
import UserProfile from '@/components/auction/UserProfile';
import AdminPanel from '@/components/auction/AdminPanel';
import LeaderBoard from '@/components/auction/LeaderBoard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('auctions');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            🎯 Аукционная Система
          </h1>
          <p className="text-lg text-muted-foreground">
            Размещай ставки, выигрывай призы, получай подарки! ⭐
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white/80 backdrop-blur shadow-lg">
            <TabsTrigger value="auctions" className="text-sm md:text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              🔥 Аукционы
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-sm md:text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              👑 Лидеры
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-sm md:text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              💎 Профиль
            </TabsTrigger>
            <TabsTrigger value="admin" className="text-sm md:text-base py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              ⚙️ Админ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="auctions" className="animate-fade-in">
            <AuctionDashboard />
          </TabsContent>

          <TabsContent value="leaderboard" className="animate-fade-in">
            <LeaderBoard />
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <UserProfile />
          </TabsContent>

          <TabsContent value="admin" className="animate-fade-in">
            <AdminPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
