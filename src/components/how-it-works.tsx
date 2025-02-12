import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Zap, Rocket, BarChartIcon as ChartBar } from 'lucide-react'

const steps = [
  {
    title: "Connect",
    description: "Seamlessly link your Farcaster account and wallet to our protocol.",
    icon: CheckCircle,
    color: "text-green-500"
  },
  {
    title: "Create",
    description: "Design eye-catching ad campaigns with our intuitive tools.",
    icon: Zap,
    color: "text-yellow-500"
  },
  {
    title: "Launch",
    description: "Set your budget and launch your campaign across the Farcaster network.",
    icon: Rocket,
    color: "text-blue-500"
  },
  {
    title: "Analyze",
    description: "Track performance and optimize your campaigns with real-time analytics.",
    icon: ChartBar,
    color: "text-purple-500"
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-xl text-center mb-12 text-muted-foreground max-w-2xl mx-auto">
          Get started with Farcaster Ads in four simple steps
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-none shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mb-4`}>
                  <step.icon size={24} />
                </div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

