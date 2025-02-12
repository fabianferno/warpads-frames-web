import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Shield, Coins, BarChart } from 'lucide-react'

const features = [
  {
    title: "Decentralized",
    description: "Leverage the power of decentralized networks for transparent and fair advertising.",
    icon: Zap
  },
  {
    title: "Secure",
    description: "Built on blockchain technology, ensuring the highest level of security for your campaigns.",
    icon: Shield
  },
  {
    title: "Cost-Effective",
    description: "Eliminate intermediaries and reduce costs with our efficient protocol.",
    icon: Coins
  },
  {
    title: "Advanced Analytics",
    description: "Get real-time, accurate analytics to optimize your advertising strategy.",
    icon: BarChart
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Farcaster Ads Protocol?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

