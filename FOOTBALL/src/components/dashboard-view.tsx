'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown, DollarSign, Target, Activity, Calendar } from 'lucide-react';
import type { UserPrediction, Match } from '@/types';

interface DashboardViewProps {
  predictions: UserPrediction[];
  matches: Match[];
  balance: number;
}

export function DashboardView({ predictions, matches, balance }: DashboardViewProps): JSX.Element {
  const activePredictions = predictions.filter((p: UserPrediction) => p.status === 'active');
  const totalWagered = predictions.reduce((sum: number, p: UserPrediction) => sum + p.amount, 0);
  const totalPotentialWin = activePredictions.reduce((sum: number, p: UserPrediction) => sum + p.potentialWin, 0);
  const wonPredictions = predictions.filter((p: UserPrediction) => p.status === 'won');
  const winRate = predictions.length > 0 ? (wonPredictions.length / predictions.length) * 100 : 0;

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getPredictionLabel = (prediction: UserPrediction): string => {
    if (prediction.prediction === 'home') return prediction.match.homeTeam;
    if (prediction.prediction === 'away') return prediction.match.awayTeam;
    return 'Draw';
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Current Balance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">${balance.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Active Predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-400">{activePredictions.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Total Wagered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">${totalWagered.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Win Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-400">{winRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Potential Winnings */}
      {activePredictions.length > 0 && (
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Total Potential Winnings
            </CardTitle>
            <CardDescription className="text-slate-300">
              If all active predictions win
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-400">${totalPotentialWin.toFixed(2)}</p>
          </CardContent>
        </Card>
      )}

      {/* Active Predictions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Your Predictions</CardTitle>
          <CardDescription className="text-slate-400">
            Track your active and past predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {predictions.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No predictions yet</p>
              <p className="text-sm text-slate-500">Go to Markets to place your first prediction</p>
            </div>
          ) : (
            <div className="space-y-4">
              {predictions.map((prediction: UserPrediction) => (
                <Card key={prediction.id} className="bg-slate-700/50 border-slate-600">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">
                          {prediction.match.homeTeam} vs {prediction.match.awayTeam}
                        </h3>
                        <p className="text-sm text-slate-400 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {formatDate(prediction.match.date)}
                        </p>
                        <Badge variant="outline" className="mt-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {prediction.match.league}
                        </Badge>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={
                          prediction.status === 'active' 
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            : prediction.status === 'won'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }
                      >
                        {prediction.status.charAt(0).toUpperCase() + prediction.status.slice(1)}
                      </Badge>
                    </div>

                    <Separator className="bg-slate-600 my-4" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Your Prediction</p>
                        <p className="text-white font-semibold">{getPredictionLabel(prediction)}</p>
                        <p className="text-xs text-slate-400 mt-1">Odds: {prediction.odds.toFixed(2)}x</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Bet Amount</p>
                        <p className="text-white font-semibold">${prediction.amount.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Potential Win</p>
                        <p className="text-green-400 font-semibold">${prediction.potentialWin.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Placed</p>
                        <p className="text-white text-sm">{formatDate(prediction.placedAt)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
