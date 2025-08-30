'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'About', 
    href: '/about',
    dropdown: [
      { name: 'Mr O\'Bryan', href: '/about/edward-obryan' },
      { name: 'Fellowship Training', href: '/about/fellowship-training' },
    ]
  },
  { 
    name: 'Conditions', 
    href: '/conditions',
    dropdown: [
      { name: 'Hip Arthritis', href: '/conditions/hip-arthritis' },
      { name: 'Knee Arthritis', href: '/conditions/knee-arthritis' },
      { name: 'Osteonecrosis', href: '/conditions/osteonecrosis' },
      { name: 'ACL Rupture', href: '/conditions/acl-rupture' },
      { name: 'Meniscal Injuries', href: '/conditions/meniscal-injuries' },
      { name: 'Cartilage Injuries', href: '/conditions/cartilage-injuries' },
    ]
  },
  { 
    name: 'Surgery', 
    href: '/surgery',
    dropdown: [
      { name: 'ACL Reconstruction', href: '/surgery/acl-reconstruction' },
      { name: 'Meniscal Repair', href: '/surgery/meniscal-repair' },
      { name: 'Robotic Hip Replacement', href: '/surgery/robotic-hip' },
      { name: 'Robotic Knee Replacement', href: '/surgery/robotic-knee' },
      { name: 'Cartilage Reconstruction', href: '/surgery/cartilage-reconstruction' },
    ]
  },
  { name: 'Patient Info', href: '/patient-info' },
  { name: 'Elite Athletes', href: '/elite-athletes' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <>
      {/* Top Banner */}
      <div className="fixed top-0 w-full z-50 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span>Expert Orthopaedic Care Available</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>Follow us:</span>
              <div className="flex space-x-2">
                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-xs">f</div>
                <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center text-xs">x</div>
                <div className="w-5 h-5 bg-blue-700 rounded flex items-center justify-center text-xs">in</div>
                <div className="w-5 h-5 bg-pink-600 rounded flex items-center justify-center text-xs">ig</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed top-10 w-full z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <div className="text-2xl font-bold text-blue-600 font-sans">
                Edward O&apos;Bryan
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-10 flex-grow justify-center">
              {navigation.map((item) => (
                <div 
                  key={item.name} 
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-base",
                      item.dropdown && "flex items-center"
                    )}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                  </Link>
                
                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors text-sm"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

            {/* CTA Section */}
            <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">0405 556 622</span>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Book Appointment
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white">
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-1 text-sm text-gray-500 hover:text-gray-700"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}