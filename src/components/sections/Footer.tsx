'use client'

export function Footer() {
  return (
    <footer className="bg-soft-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10 border-t border-surface-200">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-surface-400">&copy; {new Date().getFullYear()} Xurya.com - All Rights Reserved</span>
          <div className="flex items-center gap-4 text-xs text-surface-400">
            <a href="#" className="hover:text-surface-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-surface-600 transition-colors">Terms of Use</a>
            <a href="#about" className="hover:text-surface-600 transition-colors">About Us</a>
            <a href="#services" className="hover:text-surface-600 transition-colors">Services</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
