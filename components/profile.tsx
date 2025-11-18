"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Wallet,
  Bell,
  Shield,
  DollarSign,
  CheckCircle,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import type { UserPrediction } from "@/types";

interface ProfileSettingsProps {
  balance: number;
  onBalanceUpdate: (newBalance: number) => void;
  predictions: UserPrediction[];
  onDisconnectWallet: () => void;
}

export function ProfileSettings({
  balance,
  onBalanceUpdate,
  predictions,
  onDisconnectWallet,
}: ProfileSettingsProps) {
  const [username, setUsername] = useState<string>("Player123");
  const [email, setEmail] = useState<string>("player@example.com");
  const [walletAddress] = useState<string>("0x742d...4E67");
  const [notifications, setNotifications] = useState<boolean>(true);
  const [autoSettle, setAutoSettle] = useState<boolean>(true);
  const [depositAmount, setDepositAmount] = useState<string>("");

  const totalBets = predictions.length;
  const totalWagered = predictions.reduce(
    (sum: number, p: UserPrediction) => sum + p.amount,
    0
  );
  const wonBets = predictions.filter(
    (p: UserPrediction) => p.status === "won"
  ).length;
  const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0;

  const handleSaveProfile = (): void => {
    toast.success("Profile updated successfully");
  };

  const handleDeposit = (): void => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      onBalanceUpdate(balance + amount);
      setDepositAmount("");
      toast.success(`Deposited $${amount.toFixed(2)} successfully`);
    }
  };

  const handleWithdraw = (): void => {
    const amount = parseFloat(depositAmount);
    if (amount > 0 && amount <= balance) {
      onBalanceUpdate(balance - amount);
      setDepositAmount("");
      toast.success(`Withdrew $${amount.toFixed(2)} successfully`);
    } else {
      toast.error("Insufficient balance");
    }
  };

  const handleDisconnect = (): void => {
    onDisconnectWallet();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl">
                  {username}
                </CardTitle>
                <CardDescription className="text-slate-300 flex items-center gap-2 mt-1">
                  <Wallet className="w-4 h-4" />
                  {walletAddress}
                </CardDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-green-500/10 text-green-400 border-green-500/20 px-4 py-2"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Verified
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 text-xs">
              Total Bets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{totalBets}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 text-xs">
              Total Wagered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">
              ${totalWagered.toFixed(0)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 text-xs">
              Wins
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-400">{wonBets}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-400 text-xs">
              Win Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-400">
              {winRate.toFixed(0)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Account Settings</CardTitle>
          <CardDescription className="text-slate-400">
            Manage your profile and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-300">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Wallet Address</Label>
                  <div className="p-3 bg-slate-700/50 border border-slate-600 rounded-md">
                    <p className="text-white font-mono">{walletAddress}</p>
                  </div>
                  <p className="text-xs text-slate-400">
                    Connected via MetaMask
                  </p>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            {/* Wallet Tab */}
            <TabsContent value="wallet" className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Current Balance</p>
                    <p className="text-3xl font-bold text-white">
                      ${balance.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className="w-12 h-12 text-blue-400" />
                </div>
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-slate-300">
                    Amount ($)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={depositAmount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setDepositAmount(e.target.value)
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    min="0"
                    step="10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={handleDeposit}
                    disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Deposit
                  </Button>
                  <Button
                    onClick={handleWithdraw}
                    disabled={
                      !depositAmount ||
                      parseFloat(depositAmount) <= 0 ||
                      parseFloat(depositAmount) > balance
                    }
                    variant="outline"
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    Withdraw
                  </Button>
                </div>

                <p className="text-xs text-slate-400 text-center">
                  Transactions are processed instantly on the blockchain
                </p>
              </div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Notifications</p>
                      <p className="text-sm text-slate-400">
                        Receive updates on your predictions
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Auto-Settle</p>
                      <p className="text-sm text-slate-400">
                        Automatically settle winning bets
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={autoSettle}
                    onCheckedChange={setAutoSettle}
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Danger Zone</h4>
                  <p className="text-sm text-slate-400 mb-4">
                    Disconnect your wallet or delete your account
                  </p>
                  <div className="space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="w-full"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Disconnect Wallet
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 border-slate-700">
                        <DialogHeader>
                          <DialogTitle className="text-white">
                            Disconnect Wallet
                          </DialogTitle>
                          <DialogDescription className="text-slate-400">
                            Are you sure you want to disconnect your wallet? You
                            can reconnect anytime.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-3 justify-end">
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="border-slate-600 hover:bg-slate-700"
                            >
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <Button
                            onClick={handleDisconnect}
                            variant="destructive"
                            className="w-full"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
