import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

interface HeaderProps {
  walletConnected: boolean
  setWalletConnected: (connected: boolean) => void
  farcasterConnected: boolean
  setFarcasterConnected: (connected: boolean) => void
}

export default function Header({
  walletConnected,
  setWalletConnected,
  farcasterConnected,
  setFarcasterConnected
}: HeaderProps) {
  const handleWalletConnect = () => {
    // Implement actual wallet connection logic here
    setWalletConnected(true)
  }

  const handleFarcasterLogin = () => {
    // Implement actual Farcaster login logic here
    setFarcasterConnected(true)
  }

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src="https://warpads.xyz/android-chrome-512x512.png"
            alt="WarpAds Logo"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <Link href="/" className="text-2xl font-bold">
            WarpAds
          </Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          {/* <Link href="#features" className="text-sm font-medium hover:underline">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline">How It Works</Link>
          <Link href="#" className="text-sm font-medium hover:underline">Docs</Link> */}
        </nav>
        <div className="flex items-center space-x-4">
          {/* <Button 
            variant={walletConnected ? "secondary" : "default"}
            onClick={handleWalletConnect}
            size="sm"
          >
            {walletConnected ? "Wallet Connected" : "Connect Wallet"}
          </Button> */}
          <ConnectButton />
          {/* <Button 
            variant={farcasterConnected ? "secondary" : "default"}
            onClick={handleFarcasterLogin}
            size="sm"
          >
            {farcasterConnected ? "Farcaster Connected" : "Farcaster Login"}
          </Button> */}

        </div>
      </div>
    </header>
  )
}

