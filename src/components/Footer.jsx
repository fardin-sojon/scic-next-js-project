'use client';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing!');
    e.target.reset();
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">NextShop</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Building the future of e-commerce with modern technologies and cleaner code.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/items" className="hover:text-blue-400 transition-colors">All Items</Link></li>
              <li><Link href="/login" className="hover:text-blue-400 transition-colors">Login</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:fardinsojon@gmail.com" className="hover:text-white transition-colors">fardinsojon@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NextShop. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
