import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const categories = [
  { id: 'all', name: 'Все', icon: 'Grid3x3', color: 'bg-gradient-to-r from-primary to-secondary' },
  { id: 'greetings', name: 'Приветствия', icon: 'HandMetal', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
  { id: 'politeness', name: 'Вежливость', icon: 'Heart', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
  { id: 'food', name: 'Еда', icon: 'UtensilsCrossed', color: 'bg-gradient-to-r from-orange-500 to-amber-500' },
  { id: 'travel', name: 'Путешествия', icon: 'Plane', color: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
  { id: 'numbers', name: 'Числа', icon: 'Hash', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
  { id: 'verbs', name: 'Глаголы', icon: 'Zap', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
];

const mockWords = [
  { id: 1, word: 'Привет', translation: 'Hello', category: 'greetings', level: 'Beginner', example: 'Привет, как дела?' },
  { id: 2, word: 'Спасибо', translation: 'Thank you', category: 'politeness', level: 'Beginner', example: 'Спасибо за помощь!' },
  { id: 3, word: 'Добрый день', translation: 'Good afternoon', category: 'greetings', level: 'Beginner', example: 'Добрый день, товарищ!' },
  { id: 4, word: 'Пожалуйста', translation: 'Please / You\'re welcome', category: 'politeness', level: 'Beginner', example: 'Пожалуйста, помогите мне' },
  { id: 5, word: 'Извините', translation: 'Excuse me / Sorry', category: 'politeness', level: 'Beginner', example: 'Извините за опоздание' },
  { id: 6, word: 'Хлеб', translation: 'Bread', category: 'food', level: 'Beginner', example: 'Я люблю свежий хлеб' },
  { id: 7, word: 'Вода', translation: 'Water', category: 'food', level: 'Beginner', example: 'Можно стакан воды?' },
  { id: 8, word: 'Один', translation: 'One', category: 'numbers', level: 'Beginner', example: 'Один плюс один равно два' },
  { id: 9, word: 'Два', translation: 'Two', category: 'numbers', level: 'Beginner', example: 'У меня два билета' },
  { id: 10, word: 'Идти', translation: 'To go', category: 'verbs', level: 'Intermediate', example: 'Я хочу идти домой' },
  { id: 11, word: 'Говорить', translation: 'To speak', category: 'verbs', level: 'Intermediate', example: 'Я говорю по-русски' },
  { id: 12, word: 'Аэропорт', translation: 'Airport', category: 'travel', level: 'Intermediate', example: 'Как добраться до аэропорта?' },
];

const mockTests = [
  { id: 1, title: 'Приветствия', questions: 10, level: 'Beginner', completed: true, score: 90 },
  { id: 2, title: 'Еда и напитки', questions: 15, level: 'Beginner', completed: true, score: 85 },
  { id: 3, title: 'Числа 1-100', questions: 20, level: 'Intermediate', completed: false, score: 0 },
  { id: 4, title: 'Глаголы движения', questions: 25, level: 'Intermediate', completed: false, score: 0 },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState('dictionary');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [history, setHistory] = useState<string[]>(['Привет', 'Спасибо', 'Добрый день']);
  const [translateFrom, setTranslateFrom] = useState('');
  const [translateTo, setTranslateTo] = useState('');

  const filteredWords = mockWords.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
      word.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const addToHistory = (word: string) => {
    if (!history.includes(word)) {
      setHistory(prev => [word, ...prev].slice(0, 10));
    }
  };

  const handleTranslate = () => {
    if (translateFrom) {
      setTranslateTo(translateFrom === 'Hello' ? 'Привет' : 'Hello');
      addToHistory(translateFrom);
    }
  };

  const userProgress = {
    wordsLearned: 127,
    testsCompleted: 12,
    currentLevel: 'Intermediate',
    streakDays: 7,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="max-w-md mx-auto pb-20">
        <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-10 px-6 py-4 animate-fade-in">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            РусскийLingo
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Учим русский язык вместе</p>
        </header>

        <main className="p-4 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-lg shadow-md h-auto p-1">
              <TabsTrigger value="dictionary" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                <Icon name="BookOpen" size={20} />
                <span className="text-xs">Словарь</span>
              </TabsTrigger>
              <TabsTrigger value="translator" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all">
                <Icon name="Languages" size={20} />
                <span className="text-xs">Перевод</span>
              </TabsTrigger>
              <TabsTrigger value="tests" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all">
                <Icon name="ClipboardCheck" size={20} />
                <span className="text-xs">Тесты</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
                <Icon name="Heart" size={20} />
                <span className="text-xs">Избранное</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex flex-col items-center gap-1 py-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground transition-all">
                <Icon name="User" size={20} />
                <span className="text-xs">Профиль</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dictionary" className="space-y-4 mt-4 animate-fade-in">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск слова..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) addToHistory(e.target.value);
                  }}
                  className="pl-10 h-12 bg-white/90 backdrop-blur shadow-md border-none"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex-shrink-0 gap-2 transition-all duration-300 ${selectedCategory === category.id ? category.color + ' text-white border-none hover:opacity-90' : 'bg-white/90 hover:bg-white'}`}
                  >
                    <Icon name={category.icon} size={16} />
                    {category.name}
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {mockWords.filter(w => category.id === 'all' || w.category === category.id).length}
                    </Badge>
                  </Button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredWords.map((word, index) => (
                  <Card key={word.id} className="p-4 bg-white/90 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up border-l-4 border-primary" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-2xl font-bold text-primary">{word.word}</h3>
                          <Badge variant="secondary" className="text-xs">{word.level}</Badge>
                        </div>
                        <p className="text-lg text-foreground mb-2">{word.translation}</p>
                        <p className="text-sm text-muted-foreground italic mb-2">"{word.example}"</p>
                        <Badge variant="outline" className="text-xs">{getCategoryName(word.category)}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFavorite(word.id)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Icon 
                          name="Heart" 
                          size={24} 
                          className={favorites.includes(word.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
                        />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="translator" className="space-y-4 mt-4 animate-fade-in">
              <Card className="p-6 bg-white/90 backdrop-blur shadow-lg">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Английский</label>
                    <Input
                      placeholder="Enter text..."
                      value={translateFrom}
                      onChange={(e) => setTranslateFrom(e.target.value)}
                      className="h-12 bg-background"
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <Button onClick={handleTranslate} size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                      <Icon name="ArrowDownUp" size={20} className="mr-2" />
                      Перевести
                    </Button>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Русский</label>
                    <div className="h-12 px-3 flex items-center bg-muted rounded-lg">
                      <p className="text-lg">{translateTo || 'Результат перевода...'}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/90 backdrop-blur shadow-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="History" size={20} />
                  История переводов
                </h3>
                <div className="space-y-2">
                  {history.slice(0, 5).map((item, index) => (
                    <div key={index} className="p-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors cursor-pointer" onClick={() => setTranslateFrom(item)}>
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tests" className="space-y-4 mt-4 animate-fade-in">
              <Card className="p-4 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Ваш прогресс</p>
                    <p className="text-3xl font-bold">{userProgress.testsCompleted}/20</p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Icon name="Trophy" size={32} />
                  </div>
                </div>
                <Progress value={(userProgress.testsCompleted / 20) * 100} className="mt-3 bg-white/20" />
              </Card>

              <div className="space-y-3">
                {mockTests.map((test, index) => (
                  <Card key={test.id} className="p-4 bg-white/90 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{test.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={test.level === 'Beginner' ? 'secondary' : 'default'} className="text-xs">{test.level}</Badge>
                          <span className="text-sm text-muted-foreground">{test.questions} вопросов</span>
                        </div>
                      </div>
                      {test.completed && (
                        <div className="flex flex-col items-end">
                          <Icon name="CheckCircle2" size={24} className="text-green-500 mb-1" />
                          <span className="text-sm font-semibold text-green-600">{test.score}%</span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                      {test.completed ? 'Пройти снова' : 'Начать тест'}
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4 mt-4 animate-fade-in">
              {favorites.length === 0 ? (
                <Card className="p-8 bg-white/90 backdrop-blur shadow-lg text-center">
                  <Icon name="Heart" size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Здесь появятся избранные слова</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {mockWords.filter(word => favorites.includes(word.id)).map((word, index) => (
                    <Card key={word.id} className="p-4 bg-white/90 backdrop-blur shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up border-l-4 border-red-500" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold text-primary">{word.word}</h3>
                            <Badge variant="secondary" className="text-xs">{word.level}</Badge>
                          </div>
                          <p className="text-lg text-foreground mb-2">{word.translation}</p>
                          <p className="text-sm text-muted-foreground italic">"{word.example}"</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(word.id)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Icon name="Heart" size={24} className="fill-red-500 text-red-500" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-4 mt-4 animate-fade-in">
              <Card className="p-6 bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Иван Петров</h2>
                    <p className="text-sm opacity-90">{userProgress.currentLevel} уровень</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4 bg-white/90 backdrop-blur shadow-lg text-center">
                  <Icon name="BookOpen" size={32} className="mx-auto text-primary mb-2" />
                  <p className="text-3xl font-bold">{userProgress.wordsLearned}</p>
                  <p className="text-sm text-muted-foreground">Слов изучено</p>
                </Card>
                <Card className="p-4 bg-white/90 backdrop-blur shadow-lg text-center">
                  <Icon name="Flame" size={32} className="mx-auto text-orange-500 mb-2" />
                  <p className="text-3xl font-bold">{userProgress.streakDays}</p>
                  <p className="text-sm text-muted-foreground">Дней подряд</p>
                </Card>
              </div>

              <Card className="p-4 bg-white/90 backdrop-blur shadow-lg">
                <h3 className="font-semibold mb-3">Достижения</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg">
                    <div className="text-3xl">🏆</div>
                    <div>
                      <p className="font-semibold">Первый шаг</p>
                      <p className="text-xs text-muted-foreground">Выучили первые 10 слов</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg">
                    <div className="text-3xl">📚</div>
                    <div>
                      <p className="font-semibold">Книжный червь</p>
                      <p className="text-xs text-muted-foreground">100+ слов в словаре</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-lg">
                    <div className="text-3xl">🔥</div>
                    <div>
                      <p className="font-semibold">Неделя успеха</p>
                      <p className="text-xs text-muted-foreground">7 дней обучения подряд</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}