"use client";

import Link from "next/link";
import {
  Trophy,
  TrendingUp,
  Shield,
  Zap,
  Wallet,
  Users,
  BarChart3,
  Lock,
} from "lucide-react";

export function LandingPage() {
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
                <h2 className="text-xl font-bold text-white">
                  Football Markets
                </h2>
                <p className="text-xs text-slate-400">Decentralized Platform</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/20 h-10 px-8"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Get Started
            </Link>
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
              The first decentralized prediction market for football. Place your
              bets, trade positions, and earn rewards with complete
              transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 text-lg px-8 h-14"
              >
                <Wallet className="w-5 h-5 mr-2" />
                Get Started Now
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-600 text-white hover:bg-slate-800 text-lg px-8 h-14"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Read Docs
              </Link>
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
            Experience the future of sports prediction markets with cutting-edge
            blockchain technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all rounded-lg p-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Secure & Transparent
            </h3>
            <p className="text-slate-400 text-sm">
              All transactions are recorded on the blockchain, ensuring complete
              transparency and security
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Live Markets
            </h3>
            <p className="text-slate-400 text-sm">
              Access real-time odds and markets for matches across all major
              football leagues
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all rounded-lg p-6">
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Instant Settlements
            </h3>
            <p className="text-slate-400 text-sm">
              Automatic settlement of winning predictions with instant
              withdrawals to your wallet
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all rounded-lg p-6">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Community Driven
            </h3>
            <p className="text-slate-400 text-sm">
              Join thousands of football fans making predictions and earning
              rewards together
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all rounded-lg p-6">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Non-Custodial
            </h3>
            <p className="text-slate-400 text-sm">
              Your funds remain in your wallet. We never hold or control your
              assets
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all rounded-lg p-6">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Advanced Analytics
            </h3>
            <p className="text-slate-400 text-sm">
              Access detailed statistics and insights to make informed
              predictions
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 backdrop-blur-sm max-w-4xl mx-auto rounded-lg p-12 text-center">
          <Trophy className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Winning?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Connect your wallet and join thousands of users making predictions
            on the world's biggest football matches
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/30 text-lg px-12 h-14"
          >
            <Wallet className="w-5 h-5 mr-2" />
            Connect Wallet Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-400 text-sm">
            <p>Football Prediction Market - Powered by blockchain technology</p>
            <p className="mt-2">
              Trade responsibly. All predictions are final.
            </p>
            <p className="mt-4 text-xs">
              © 2024 Football Markets. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
