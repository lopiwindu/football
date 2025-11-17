export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: Date;
  league: string;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
  totalPool: number;
  status: 'upcoming' | 'live' | 'completed';
  result?: 'home' | 'draw' | 'away';
}

export interface UserPrediction {
  id: string;
  matchId: string;
  match: Match;
  prediction: 'home' | 'draw' | 'away';
  amount: number;
  odds: number;
  potentialWin: number;
  status: 'active' | 'won' | 'lost';
  placedAt: Date;
  settledAt?: Date;
}

export interface UserProfile {
  id: string;
  address: string;
  username?: string;
  email?: string;
  totalBets: number;
  totalWagered: number;
  totalWinnings: number;
  winRate: number;
  createdAt: Date;
}
