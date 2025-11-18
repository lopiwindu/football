"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WalletProvider, useWallet } from "@/hooks/use-wallet";
import { MarketCard } from "@/components/market-card";
import { ProfileSettings } from "@/components/profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  TrendingUp,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";
import type { Match, UserPrediction } from "@/types";

function DashboardApp() {
  const router = useRouter();
  const {
    isConnected,
    isConnecting,
    walletAddress,
    connectWallet,
    disconnectWallet,
  } = useWallet();
  const [activeTab, setActiveTab] = useState<string>("markets");
  const [matches, setMatches] = useState<Match[]>([]);
  const [userPredictions, setUserPredictions] = useState<UserPrediction[]>([]);
  const [userBalance, setUserBalance] = useState<number>(1000);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    // Initialize with upcoming football matches
    const upcomingMatches: Match[] = [
      {
        id: "1",
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        date: new Date("2024-12-25T15:00:00"),
        league: "Premier League",
        homeOdds: 2.5,
        drawOdds: 3.2,
        awayOdds: 2.8,
        totalPool: 25000,
        status: "upcoming",
      },
      {
        id: "2",
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        date: new Date("2024-12-26T20:00:00"),
        league: "La Liga",
        homeOdds: 2.1,
        drawOdds: 3.5,
        awayOdds: 3.4,
        totalPool: 48000,
        status: "upcoming",
      },
      {
        id: "3",
        homeTeam: "Bayern Munich",
        awayTeam: "Borussia Dortmund",
        date: new Date("2024-12-27T18:30:00"),
        league: "Bundesliga",
        homeOdds: 1.8,
        drawOdds: 3.8,
        awayOdds: 4.2,
        totalPool: 32000,
        status: "upcoming",
      },
      {
        id: "4",
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        date: new Date("2024-12-28T14:00:00"),
        league: "Premier League",
        homeOdds: 2.3,
        drawOdds: 3.1,
        awayOdds: 3.0,
        totalPool: 21000,
        status: "upcoming",
      },
      {
        id: "5",
        homeTeam: "PSG",
        awayTeam: "Marseille",
        date: new Date("2024-12-29T21:00:00"),
        league: "Ligue 1",
        homeOdds: 1.6,
        drawOdds: 4.0,
        awayOdds: 5.5,
        totalPool: 18000,
        status: "upcoming",
      },
      {
        id: "6",
        homeTeam: "Inter Milan",
        awayTeam: "AC Milan",
        date: new Date("2024-12-30T19:45:00"),
        league: "Serie A",
        homeOdds: 2.4,
        drawOdds: 3.3,
        awayOdds: 2.9,
        totalPool: 28000,
        status: "upcoming",
      },
    ];

    setMatches(upcomingMatches);
  }, []);

  const handlePlaceBet = (
    matchId: string,
    prediction: "home" | "draw" | "away",
    amount: number
  ): void => {
    const match = matches.find((m: Match) => m.id === matchId);
    if (!match || userBalance < amount) return;

    const odds =
      prediction === "home"
        ? match.homeOdds
        : prediction === "draw"
        ? match.drawOdds
        : match.awayOdds;
    const potentialWin = amount * odds;

    const newPrediction: UserPrediction = {
      id: `pred-${Date.now()}`,
      matchId,
      match,
      prediction,
      amount,
      odds,
      potentialWin,
      status: "active",
      placedAt: new Date(),
    };

    setUserPredictions([...userPredictions, newPrediction]);
    setUserBalance(userBalance - amount);

    // Update match pool
    setMatches(
      matches.map((m: Match) =>
        m.id === matchId ? { ...m, totalPool: m.totalPool + amount } : m
      )
    );
  };

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
                <h1 className="text-2xl font-bold text-white">
                  Football Prediction Market
                </h1>
                <p className="text-sm text-slate-400">
                  Decentralized betting platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isConnected ? (
                <Dialog
                  open={isWalletDialogOpen}
                  onOpenChange={setIsWalletDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button className="bg-slate-700/50 text-slate-300 border border-slate-600 px-4 py-2 rounded-md text-sm hover:bg-slate-700/70 transition-colors cursor-pointer">
                      {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Wallet Details
                      </DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Manage your wallet connection
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                        <p className="text-sm text-slate-400 mb-2">
                          Wallet Address
                        </p>
                        <p className="text-white font-mono break-all">
                          {walletAddress}
                        </p>
                      </div>
                      <Button
                        onClick={() => {
                          disconnectWallet();
                          setIsWalletDialogOpen(false);
                          router.push("/");
                        }}
                        variant="destructive"
                        className="w-full"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Disconnect Wallet
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="bg-blue-600 hover:bg-blue-700 text-sm"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
              <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-2 rounded-md text-sm">
                Balance: ${userBalance.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("markets")}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "markets"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Markets
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              Profile
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "markets" && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <h2 className="text-white text-2xl font-bold mb-2">
                Live Prediction Markets
              </h2>
              <p className="text-slate-400 mb-6">
                Select a match and place your prediction
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {matches.map((match: Match) => {
                  // Calculate total bet for this match
                  const totalBetOnMatch = userPredictions
                    .filter((p) => p.matchId === match.id)
                    .reduce((sum, p) => sum + p.amount, 0);

                  return (
                    <MarketCard
                      key={match.id}
                      match={match}
                      onPlaceBet={handlePlaceBet}
                      userBalance={userBalance}
                      isWalletConnected={isConnected}
                      userTotalBetOnMatch={totalBetOnMatch}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Current Balance</p>
                  <p className="text-white text-3xl font-bold">
                    ${userBalance.toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">
                    Active Predictions
                  </p>
                  <p className="text-blue-400 text-3xl font-bold">
                    {
                      userPredictions.filter((p) => p.status === "active")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Total Wagered</p>
                  <p className="text-white text-3xl font-bold">
                    $
                    {userPredictions
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Win Rate</p>
                  <p className="text-green-400 text-3xl font-bold">
                    {userPredictions.length > 0
                      ? (
                          (userPredictions.filter((p) => p.status === "won")
                            .length /
                            userPredictions.length) *
                          100
                        ).toFixed(1)
                      : "0.0"}
                    %
                  </p>
                </div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
                <h2 className="text-white text-xl font-bold mb-4">
                  Your Predictions
                </h2>
                {userPredictions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-slate-400 mb-2">No predictions yet</p>
                    <p className="text-sm text-slate-500">
                      Go to Markets to place your first prediction
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userPredictions.map((prediction) => (
                      <div
                        key={prediction.id}
                        className="bg-slate-700/50 border border-slate-600 rounded-lg p-4"
                      >
                        <h3 className="text-white font-semibold mb-2">
                          {prediction.match.homeTeam} vs{" "}
                          {prediction.match.awayTeam}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-slate-400">Prediction: </span>
                            <span className="text-white">
                              {prediction.prediction}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Amount: </span>
                            <span className="text-white">
                              ${prediction.amount}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">Odds: </span>
                            <span className="text-white">
                              {prediction.odds}x
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-400">
                              Potential Win:{" "}
                            </span>
                            <span className="text-green-400">
                              ${prediction.potentialWin.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <ProfileSettings
              balance={userBalance}
              onBalanceUpdate={setUserBalance}
              predictions={userPredictions}
              onDisconnectWallet={() => {
                disconnectWallet();
                router.push("/");
              }}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-slate-400 text-sm">
            <p>Football Prediction Market - Powered by blockchain technology</p>
            <p className="mt-1">
              Trade responsibly. All predictions are final.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <WalletProvider>
      <DashboardApp />
    </WalletProvider>
  );
}
