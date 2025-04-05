
import Link from "next/link"
import { Github, Mail, Heart, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-off-white border-t border-slate-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-lavender-600">
              MindSafe
            </Link>
            <p className="text-sm text-slate-500 mt-2">Share your story. Heal together.</p>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-col space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </div>

            <div className="flex flex-col space-y-2">
              <FooterSocialLink
                href="https://github.com/mindsafe"
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
              />
              <FooterSocialLink href="mailto:contact@mindsafe.io" icon={<Mail className="h-4 w-4" />} label="Contact" />
              <FooterSocialLink href="/crisis-help" icon={<Phone className="h-4 w-4" />} label="Crisis Help" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-lavender-100 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MindSafe. All rights reserved.</p>
          <p className="mt-2">
            <Heart className="h-3 w-3 inline-block mr-1 text-lavender-500" />
            Made with compassion for mental health and wellness.
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }) {
  return (
    <Link href={href} className="text-white hover:text-lavender-600 transition-colors">
      {children}
    </Link>
  )
}

function FooterSocialLink({
  href,
  icon,
  label,
}) {
  return (
    <Link href={href} className="flex items-center text-white hover:text-lavender-600 transition-colors">
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  )
}

