'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, TrendingUp, Shield, Zap, Wallet, Users, BarChart3, Lock } from 'lucide-react';

interface LandingPageProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export function LandingPage({ onConnect, isConnecting }: LandingPageProps): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Football Markets</h2>
                <p className="text-xs text-slate-400">Decentralized Platform</p>
              </div>
            </div>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20"
              size="lg"
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-32 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm mb-4">
              <Zap className="w-4 h-4" />
              <span>Powered by Blockchain Technology</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Predict. Trade. Win.
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Football Markets
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
              The first decentralized prediction market for football. Place your bets, 
              trade positions, and earn rewards with complete transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button 
                onClick={onConnect}
                disabled={isConnecting}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all"
              >
                <Wallet className="w-5 h-5 mr-2" />
                {isConnecting ? 'Connecting Wallet...' : 'Get Started Now'}
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-6"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Markets
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">$2.5M+</div>
                <div className="text-sm text-slate-400 mt-1">Total Volume</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">15K+</div>
                <div className="text-sm text-slate-400 mt-1">Active Users</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-slate-400 mt-1">Markets</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
                <div className="text-3xl font-bold text-white">98.5%</div>
                <div className="text-sm text-slate-400 mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Experience the future of sports prediction markets with cutting-edge blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">Secure & Transparent</CardTitle>
              <CardDescription className="text-slate-400">
                All transactions are recorded on the blockchain, ensuring complete transparency and security
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Live Markets</CardTitle>
              <CardDescription className="text-slate-400">
                Access real-time odds and markets for matches across all major football leagues
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Instant Settlements</CardTitle>
              <CardDescription className="text-slate-400">
                Automatic settlement of winning predictions with instant withdrawals to your wallet
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white">Community Driven</CardTitle>
              <CardDescription className="text-slate-400">
                Join thousands of football fans making predictions and earning rewards together
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-red-400" />
              </div>
              <CardTitle className="text-white">Non-Custodial</CardTitle>
              <CardDescription className="text-slate-400">
                Your funds remain in your wallet. We never hold or control your assets
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-indigo-400" />
              </div>
              <CardTitle className="text-white">Advanced Analytics</CardTitle>
              <CardDescription className="text-slate-400">
                Access detailed statistics and insights to make informed predictions
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <Trophy className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Winning?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Connect your wallet and join thousands of users making predictions on the world's biggest football matches
            </p>
            <Button 
              onClick={onConnect}
              disabled={isConnecting}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-12 py-6 shadow-2xl shadow-blue-500/30"
            >
              <Wallet className="w-5 h-5 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet Now'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-400 text-sm">
            <p>Football Prediction Market - Powered by blockchain technology</p>
            <p className="mt-2">Trade responsibly. All predictions are final.</p>
            <p className="mt-4 text-xs">© 2024 Football Markets. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
