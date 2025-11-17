'use client'
import { useState, useEffect, createContext, useContext } from 'react';
import { toast } from 'sonner';

interface WalletContextType {
  isConnected: boolean;
  isConnecting: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet was previously connected
    const savedWallet = localStorage.getItem('walletAddress');
    if (savedWallet) {
      setWalletAddress(savedWallet);
      setIsConnected(true);
    }
  }, []);

  const connectWallet = async (): Promise<void> => {
    setIsConnecting(true);
    
    try {
      // Check if MetaMask or other wallet is installed
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        // Request account access
        const accounts = await (window as any).ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        if (accounts && accounts.length > 0) {
          const address = accounts[0] as string;
          setWalletAddress(address);
          setIsConnected(true);
          localStorage.setItem('walletAddress', address);
          
          toast.success('Wallet Connected!', {
            description: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`
          });
        }
      } else {
        // Simulate wallet connection for demo purposes
        const demoAddress = '0x' + Math.random().toString(16).slice(2, 42).padEnd(40, '0');
        setWalletAddress(demoAddress);
        setIsConnected(true);
        localStorage.setItem('walletAddress', demoAddress);
        
        toast.success('Demo Wallet Connected!', {
          description: `Connected to ${demoAddress.slice(0, 6)}...${demoAddress.slice(-4)}`
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Connection Failed', {
        description: 'Failed to connect wallet. Please try again.'
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = (): void => {
    setWalletAddress(null);
    setIsConnected(false);
    localStorage.removeItem('walletAddress');
    toast.info('Wallet Disconnected', {
      description: 'Your wallet has been disconnected'
    });
  };

  return (
    <WalletContext.Provider 
      value={{ 
        isConnected, 
        isConnecting, 
        walletAddress, 
        connectWallet, 
        disconnectWallet 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
