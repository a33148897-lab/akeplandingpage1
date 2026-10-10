import { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { RequestAccessModal } from './RequestAccessModal';
import { Logo } from './Logo';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navItems = ['Features', 'How It Works', 'Use Cases', 'Pricing'];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1F]/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Logo variant="full" size="md" />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-[#6B7280] hover:text-white transition-colors text-sm font-medium"
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="#login"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-[#6B7280] hover:text-white transition-colors text-sm font-medium"
              >
                Login
              </motion.a>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="px-6 py-2.5 bg-[#2D6BFF] hover:bg-[#1E5AFF] text-white rounded-lg font-medium transition-all text-sm"
                onClick={() => setShowModal(true)}
              >
                Request Access
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-6"
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block py-3 text-[#6B7280] hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#login"
                className="block py-3 text-[#6B7280] hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </a>
              <button
                className="mt-4 w-full px-6 py-2.5 bg-[#2D6BFF] hover:bg-[#1E5AFF] text-white rounded-lg font-medium transition-all"
                onClick={() => {
                  setIsOpen(false);
                  setShowModal(true);
                }}
              >
                Request Access
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      <RequestAccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}