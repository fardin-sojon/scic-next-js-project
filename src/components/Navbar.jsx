'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import toast, { Toaster } from 'react-hot-toast';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        currentUser.getIdToken().then(token => {
           Cookies.set('auth_token', token, { expires: 1 });
        });
      } else {
        Cookies.remove('auth_token');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Cookies.remove('auth_token');
      toast.success('Logged out successfully', { duration: 2000 });
      router.push('/login');
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
           <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
             <img src="/logo.png" alt="NextShop Logo" className="w-8 h-8 object-contain" />
             <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
               NextShop
             </span>
           </Link>
             
           {/* Desktop Navigation - Centered */}
           <div className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
             {[
               { name: 'Home', path: '/' },
               { name: 'Items', path: '/items' },
               { name: 'Add Item', path: '/dashboard/add-item', authRequired: true },
             ].filter(link => !link.authRequired || user).map((link) => (
               <Link
                 key={link.path}
                 href={link.path}
                 className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                   isActive(link.path)
                     ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold shadow-sm'
                     : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                 }`}
               >
                 {link.name}
               </Link>
             ))}
           </div>

          <div className="flex items-center space-x-4">
            {user ? (
               <div className="relative">
                 <button 
                   onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                   className="flex items-center gap-2 focus:outline-none transition-transform active:scale-95"
                 >
                   {user.photoURL && !imageError ? (
                      <img 
                        src={user.photoURL} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900"
                        onError={() => setImageError(true)}
                      />
                   ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email || 'User')}&background=random&color=fff`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 dark:border-blue-900"
                      />
                   )}
                 </button>

                 {isDropdownOpen && (
                   <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 border border-gray-100 dark:border-gray-700 transform transition-all animate-in fade-in zoom-in-95 duration-200">
                     <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                       <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.displayName || 'User'}</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                     </div>
                     
                     <div className="py-1">
                       <Link
                         href="/profile"
                         className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                         onClick={() => setIsDropdownOpen(false)}
                       >
                         <span>👤</span> Your Profile
                       </Link>
                       <button
                         onClick={handleLogout}
                         className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                       >
                         <span>🚪</span> Logout
                       </button>
                     </div>
                   </div>
                 )}
                 
                 {/* Backdrop to close dropdown */}
                 {isDropdownOpen && (
                   <div 
                     className="fixed inset-0 z-[-1]" 
                     onClick={() => setIsDropdownOpen(false)}
                   ></div>
                 )}
               </div>
            ) : (
              <div className="flex gap-2">
                <Link 
                  href={`/login?redirect=${encodeURIComponent(pathname)}`}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
