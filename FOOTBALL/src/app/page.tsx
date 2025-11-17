'use client'
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MarketCard } from '@/components/market-card';
import { DashboardView } from '@/components/dashboard-view';
import { ProfileSettings } from '@/components/profile-settings';
import { LandingPage } from '@/components/landing-page';
import { WalletProvider, useWallet } from '@/hooks/use-wallet';
import { TrendingUp, LayoutDashboard, User, Trophy, LogOut } from 'lucide-react';
import type { Match, UserPrediction } from '@/types';
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

function PredictionMarketApp(): JSX.Element {
    const { isConnected, isConnecting, walletAddress, connectWallet, disconnectWallet } = useWallet();
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  const [activeTab, setActiveTab] = useState<string>('markets');
  const [matches, setMatches] = useState<Match[]>([]);
  const [userPredictions, setUserPredictions] = useState<UserPrediction[]>([]);
  const [userBalance, setUserBalance] = useState<number>(1000);

  useEffect(() => {
    // Initialize with upcoming football matches
    const upcomingMatches: Match[] = [
      {
        id: '1',
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        date: new Date('2024-12-25T15:00:00'),
        league: 'Premier League',
        homeOdds: 2.5,
        drawOdds: 3.2,
        awayOdds: 2.8,
        totalPool: 25000,
        status: 'upcoming'
      },
      {
        id: '2',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        date: new Date('2024-12-26T20:00:00'),
        league: 'La Liga',
        homeOdds: 2.1,
        drawOdds: 3.5,
        awayOdds: 3.4,
        totalPool: 48000,
        status: 'upcoming'
      },
      {
        id: '3',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Borussia Dortmund',
        date: new Date('2024-12-27T18:30:00'),
        league: 'Bundesliga',
        homeOdds: 1.8,
        drawOdds: 3.8,
        awayOdds: 4.2,
        totalPool: 32000,
        status: 'upcoming'
      },
      {
        id: '4',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        date: new Date('2024-12-28T14:00:00'),
        league: 'Premier League',
        homeOdds: 2.3,
        drawOdds: 3.1,
        awayOdds: 3.0,
        totalPool: 21000,
        status: 'upcoming'
      },
      {
        id: '5',
        homeTeam: 'PSG',
        awayTeam: 'Marseille',
        date: new Date('2024-12-29T21:00:00'),
        league: 'Ligue 1',
        homeOdds: 1.6,
        drawOdds: 4.0,
        awayOdds: 5.5,
        totalPool: 18000,
        status: 'upcoming'
      },
      {
        id: '6',
        homeTeam: 'Inter Milan',
        awayTeam: 'AC Milan',
        date: new Date('2024-12-30T19:45:00'),
        league: 'Serie A',
        homeOdds: 2.4,
        drawOdds: 3.3,
        awayOdds: 2.9,
        totalPool: 28000,
        status: 'upcoming'
      }
    ];

    setMatches(upcomingMatches);
  }, []);

  const handlePlaceBet = (matchId: string, prediction: 'home' | 'draw' | 'away', amount: number): void => {
    const match = matches.find((m: Match) => m.id === matchId);
    if (!match || userBalance < amount) return;

    const odds = prediction === 'home' ? match.homeOdds : prediction === 'draw' ? match.drawOdds : match.awayOdds;
    const potentialWin = amount * odds;

    const newPrediction: UserPrediction = {
      id: `pred-${Date.now()}`,
      matchId,
      match,
      prediction,
      amount,
      odds,
      potentialWin,
      status: 'active',
      placedAt: new Date()
    };

    setUserPredictions([...userPredictions, newPrediction]);
    setUserBalance(userBalance - amount);

    // Update match pool
    setMatches(matches.map((m: Match) => 
      m.id === matchId ? { ...m, totalPool: m.totalPool + amount } : m
    ));
  };

  // Show landing page if not connected
  if (!isConnected) {
    return <LandingPage onConnect={connectWallet} isConnecting={isConnecting} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Football Prediction Market</h1>
                <p className="text-sm text-slate-400">Decentralized betting platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600 px-4 py-2">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2">
                Balance: ${userBalance.toLocaleString()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={disconnectWallet}
                className="text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-800 p-1">
            <TabsTrigger value="markets" className="data-[state=active]:bg-blue-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Markets
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Markets Tab */}
          <TabsContent value="markets" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Live Prediction Markets</CardTitle>
                <CardDescription className="text-slate-400">
                  Select a match and place your prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {matches.map((match: Match) => (
                    <MarketCard
                      key={match.id}
                      match={match}
                      onPlaceBet={handlePlaceBet}
                      userBalance={userBalance}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <DashboardView 
              predictions={userPredictions}
              matches={matches}
              balance={userBalance}
            />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileSettings 
              balance={userBalance}
              onBalanceUpdate={setUserBalance}
              predictions={userPredictions}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-slate-400 text-sm">
            <p>Football Prediction Market - Powered by blockchain technology</p>
            <p className="mt-1">Trade responsibly. All predictions are final.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function PredictionMarketPage(): JSX.Element {
  return (
    <WalletProvider>
      <PredictionMarketApp />
    </WalletProvider>
  );
}
