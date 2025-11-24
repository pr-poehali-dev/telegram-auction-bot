import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    emoji: '🎁',
    startPrice: 1000,
    maxBid: 5000,
    bidIncrement: 100,
    duration: 120,
  });

  const emojis = ['🎁', '⭐', '👑', '💎', '🏆', '✨', '🔥', '💰', '🎯', '🎪'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description) {
      toast.error('Заполните все поля!', {
        description: 'Название и описание обязательны',
      });
      return;
    }

    if (formData.startPrice >= formData.maxBid) {
      toast.error('Ошибка в ценах!', {
        description: 'Начальная цена должна быть меньше максимальной',
      });
      return;
    }

    toast.success('Аукцион создан! 🎉', {
      description: `${formData.title} запущен успешно`,
      icon: formData.emoji,
    });

    setFormData({
      title: '',
      description: '',
      emoji: '🎁',
      startPrice: 1000,
      maxBid: 5000,
      bidIncrement: 100,
      duration: 120,
    });
  };

  const stats = {
    activeAuctions: 4,
    totalBids: 224,
    totalRevenue: 125000,
    activeUsers: 156,
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          ⚙️ Панель Администратора
        </h2>
        <p className="text-muted-foreground">Управление аукционами и системой</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-none shadow-lg">
          <Icon name="Activity" className="mx-auto mb-2" size={32} />
          <div className="text-3xl font-black mb-1">{stats.activeAuctions}</div>
          <div className="text-sm font-medium opacity-90">Активных</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-purple-500 to-pink-500 text-white border-none shadow-lg">
          <Icon name="MousePointerClick" className="mx-auto mb-2" size={32} />
          <div className="text-3xl font-black mb-1">{stats.totalBids}</div>
          <div className="text-sm font-medium opacity-90">Ставок</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-green-500 to-emerald-500 text-white border-none shadow-lg">
          <Icon name="DollarSign" className="mx-auto mb-2" size={32} />
          <div className="text-3xl font-black mb-1">{(stats.totalRevenue / 1000).toFixed(0)}K</div>
          <div className="text-sm font-medium opacity-90">Оборот ⭐</div>
        </Card>

        <Card className="p-4 text-center bg-gradient-to-br from-orange-500 to-red-500 text-white border-none shadow-lg">
          <Icon name="Users" className="mx-auto mb-2" size={32} />
          <div className="text-3xl font-black mb-1">{stats.activeUsers}</div>
          <div className="text-sm font-medium opacity-90">Пользователей</div>
        </Card>
      </div>

      <Card className="p-6 bg-white/90 backdrop-blur border-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
            <Icon name="Plus" className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-black text-foreground">Создать новый аукцион</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Название
              </Label>
              <Input
                id="title"
                placeholder="Премиум Телеграм Гифт"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="border-2 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-base font-semibold">Эмодзи</Label>
              <div className="flex flex-wrap gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData({ ...formData, emoji })}
                    className={`text-3xl p-2 rounded-lg transition-all hover:scale-110 ${
                      formData.emoji === emoji
                        ? 'bg-purple-100 ring-2 ring-purple-500 scale-110'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Описание
            </Label>
            <Textarea
              id="description"
              placeholder="Эксклюзивный цифровой подарок с уникальной анимацией"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-2 min-h-20"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startPrice" className="text-sm font-semibold">
                Начальная цена ⭐
              </Label>
              <Input
                id="startPrice"
                type="number"
                value={formData.startPrice}
                onChange={(e) => setFormData({ ...formData, startPrice: Number(e.target.value) })}
                min={1}
                className="border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxBid" className="text-sm font-semibold">
                Макс. ставка ⭐
              </Label>
              <Input
                id="maxBid"
                type="number"
                value={formData.maxBid}
                onChange={(e) => setFormData({ ...formData, maxBid: Number(e.target.value) })}
                min={1}
                className="border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bidIncrement" className="text-sm font-semibold">
                Шаг ставки ⭐
              </Label>
              <Input
                id="bidIncrement"
                type="number"
                value={formData.bidIncrement}
                onChange={(e) => setFormData({ ...formData, bidIncrement: Number(e.target.value) })}
                min={1}
                className="border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-semibold">
                Длительность (мин)
              </Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                min={1}
                className="border-2"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
            <div className="flex items-center gap-3">
              <Icon name="Info" className="text-purple-600" size={24} />
              <div>
                <div className="font-semibold text-foreground">Предпросмотр</div>
                <div className="text-sm text-muted-foreground">
                  {formData.title || 'Без названия'} • {formData.startPrice} - {formData.maxBid} ⭐ • {formData.duration} мин
                </div>
              </div>
            </div>
            <div className="text-4xl animate-pulse-star">{formData.emoji}</div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-2 font-semibold"
              onClick={() =>
                setFormData({
                  title: '',
                  description: '',
                  emoji: '🎁',
                  startPrice: 1000,
                  maxBid: 5000,
                  bidIncrement: 100,
                  duration: 120,
                })
              }
            >
              Очистить
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg shadow-lg"
            >
              <Icon name="Rocket" size={20} className="mr-2" />
              Запустить аукцион
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6 bg-white/90 backdrop-blur border-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-foreground">📊 Управление системой</h3>
          <Badge className="bg-green-500 text-white font-semibold">
            Всё работает
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button variant="outline" className="border-2 font-semibold justify-start h-auto py-3">
            <Icon name="Database" size={20} className="mr-3" />
            <div className="text-left">
              <div className="font-bold">База данных</div>
              <div className="text-xs text-muted-foreground">Управление записями</div>
            </div>
          </Button>
          
          <Button variant="outline" className="border-2 font-semibold justify-start h-auto py-3">
            <Icon name="Users" size={20} className="mr-3" />
            <div className="text-left">
              <div className="font-bold">Пользователи</div>
              <div className="text-xs text-muted-foreground">Балансы и права</div>
            </div>
          </Button>
          
          <Button variant="outline" className="border-2 font-semibold justify-start h-auto py-3">
            <Icon name="Settings" size={20} className="mr-3" />
            <div className="text-left">
              <div className="font-bold">Настройки</div>
              <div className="text-xs text-muted-foreground">Конфигурация</div>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
