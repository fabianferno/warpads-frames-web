import Link from 'next/link'
import { Facebook, Twitter, Instagram, GitlabIcon as GitHub } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Farcaster Ads Protocol</h3>
            <p className="text-sm text-muted-foreground">
              Revolutionizing advertising in the decentralized world.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <GitHub size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Home</Link></li>
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Features</Link></li>
              <li><Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">How It Works</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">API Reference</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Blog</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest news and features</p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted-foreground/20 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Farcaster Ads Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

