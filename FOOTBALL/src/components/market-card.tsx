'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, TrendingUp, DollarSign, Users } from 'lucide-react';
import type { Match } from '@/types';

interface MarketCardProps {
  match: Match;
  onPlaceBet: (matchId: string, prediction: 'home' | 'draw' | 'away', amount: number) => void;
  userBalance: number;
}

export function MarketCard({ match, onPlaceBet, userBalance }: MarketCardProps): JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedPrediction, setSelectedPrediction] = useState<'home' | 'draw' | 'away' | null>(null);
  const [betAmount, setBetAmount] = useState<string>('');

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleBetClick = (prediction: 'home' | 'draw' | 'away'): void => {
    setSelectedPrediction(prediction);
    setIsDialogOpen(true);
  };

  const handleConfirmBet = (): void => {
    const amount = parseFloat(betAmount);
    if (selectedPrediction && amount > 0 && amount <= userBalance) {
      onPlaceBet(match.id, selectedPrediction, amount);
      setIsDialogOpen(false);
      setBetAmount('');
      setSelectedPrediction(null);
    }
  };

  const getPredictionLabel = (): string => {
    if (!selectedPrediction) return '';
    if (selectedPrediction === 'home') return match.homeTeam;
    if (selectedPrediction === 'away') return match.awayTeam;
    return 'Draw';
  };

  const getSelectedOdds = (): number => {
    if (!selectedPrediction) return 0;
    if (selectedPrediction === 'home') return match.homeOdds;
    if (selectedPrediction === 'draw') return match.drawOdds;
    return match.awayOdds;
  };

  const calculatePotentialWin = (): number => {
    const amount = parseFloat(betAmount) || 0;
    return amount * getSelectedOdds();
  };

  return (
    <>
      <Card className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              {match.league}
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
              Live
            </Badge>
          </div>
          <CardTitle className="text-white text-lg">
            {match.homeTeam} vs {match.awayTeam}
          </CardTitle>
          <CardDescription className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-3 h-3" />
            {formatDate(match.date)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Odds Display */}
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              className="flex flex-col h-auto py-3 bg-slate-700/50 border-slate-600 hover:bg-blue-600 hover:border-blue-500"
              onClick={() => handleBetClick('home')}
            >
              <span className="text-xs text-slate-400 mb-1">Home</span>
              <span className="text-lg font-bold text-white">{match.homeOdds.toFixed(2)}</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-auto py-3 bg-slate-700/50 border-slate-600 hover:bg-blue-600 hover:border-blue-500"
              onClick={() => handleBetClick('draw')}
            >
              <span className="text-xs text-slate-400 mb-1">Draw</span>
              <span className="text-lg font-bold text-white">{match.drawOdds.toFixed(2)}</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-auto py-3 bg-slate-700/50 border-slate-600 hover:bg-blue-600 hover:border-blue-500"
              onClick={() => handleBetClick('away')}
            >
              <span className="text-xs text-slate-400 mb-1">Away</span>
              <span className="text-lg font-bold text-white">{match.awayOdds.toFixed(2)}</span>
            </Button>
          </div>

          <Separator className="bg-slate-700" />

          {/* Market Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Users className="w-4 h-4" />
              <span>Pool:</span>
            </div>
            <span className="text-white font-semibold">${match.totalPool.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Bet Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Place Your Prediction</DialogTitle>
            <DialogDescription className="text-slate-400">
              {match.homeTeam} vs {match.awayTeam}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Your Prediction</Label>
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                <p className="text-white font-semibold">{getPredictionLabel()}</p>
                <p className="text-sm text-slate-400">Odds: {getSelectedOdds().toFixed(2)}x</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-300">Bet Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={betAmount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBetAmount(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                min="0"
                max={userBalance}
                step="10"
              />
              <p className="text-xs text-slate-400">Available balance: ${userBalance.toLocaleString()}</p>
            </div>

            {betAmount && parseFloat(betAmount) > 0 && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Potential Win:</span>
                  <span className="text-green-400 font-bold text-lg">
                    ${calculatePotentialWin().toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleConfirmBet}
              disabled={!betAmount || parseFloat(betAmount) <= 0 || parseFloat(betAmount) > userBalance}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Confirm Bet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
