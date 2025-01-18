import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Elevate Your Farcaster Advertising
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Harness the power of decentralized advertising with Farcaster Ads Protocol. Reach your audience efficiently and transparently.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" onClick={() => window.ethereum?.request({ method: 'eth_requestAccounts' })}>Get Started</Button>
          <Button size="lg" variant="outline">Learn More</Button>
        </div>
      </div>
    </section>
  )
}

