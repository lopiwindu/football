"use client";

import { useState, useEffect } from "react";
import { WalletProvider, useWallet } from "@/hooks/use-wallet";
import {
  Trophy,
  TrendingUp,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";
import type { Match, UserPrediction } from "@/types";

function DashboardApp(): JSX.Element {
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

  // Redirect to home if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            Welcome to Football Markets
          </h1>
          <p className="text-slate-300">
            Connect your wallet to access the dashboard
          </p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg px-8 h-12"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        </div>
      </div>
    );
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
                <h1 className="text-2xl font-bold text-white">
                  Football Prediction Market
                </h1>
                <p className="text-sm text-slate-400">
                  Decentralized betting platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-slate-700/50 text-slate-300 border border-slate-600 px-4 py-2 rounded-md text-sm">
                {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
              </div>
              <div className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-2 rounded-md text-sm">
                Balance: ${userBalance.toLocaleString()}
              </div>
              <button
                onClick={disconnectWallet}
                className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-md"
              >
                <LogOut className="w-4 h-4" />
              </button>
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
                {matches.map((match: Match) => (
                  <div
                    key={match.id}
                    className="bg-slate-700/50 border border-slate-600 rounded-lg p-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400 text-xs border border-blue-500/20 bg-blue-500/10 px-2 py-1 rounded">
                          {match.league}
                        </span>
                        <span className="text-green-400 text-xs border border-green-500/20 bg-green-500/10 px-2 py-1 rounded">
                          Live
                        </span>
                      </div>
                      <h3 className="text-white font-semibold">
                        {match.homeTeam} vs {match.awayTeam}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {new Date(match.date).toLocaleDateString()}
                      </p>
                      <div className="text-slate-400 text-sm">
                        Pool: ${match.totalPool.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
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
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-white text-xl font-bold mb-4">
                Profile Settings
              </h2>
              <p className="text-slate-400">
                Profile management coming soon...
              </p>
            </div>
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

export default function DashboardPage(): JSX.Element {
  return (
    <WalletProvider>
      <DashboardApp />
    </WalletProvider>
  );
}
