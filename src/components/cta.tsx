import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Ready to Transform Your Advertising?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
          Join the Farcaster Ads Protocol today and experience the future of decentralized advertising.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-colors duration-300">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600 transition-colors duration-300">
            Schedule a Demo
          </Button>
        </div>
        <p className="mt-8 text-sm text-purple-200">
          No credit card required. Start your free 14-day trial today.
        </p>
      </div>
    </section>
  )
}

