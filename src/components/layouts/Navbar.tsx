
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Market Insights', path: '/insights' },
    { name: 'Data Analyzer', path: '/analyzer' },
    { name: 'News', path: '/news' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        scrolled 
          ? 'py-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 outline-none">
            <div className="relative h-8 w-8 rounded-full bg-blue-gradient flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">
              Investere
            </span>
          </NavLink>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  'px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
                  isActive 
                    ? 'text-finance-blue' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-finance-blue dark:hover:text-finance-blue'
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-finance-blue text-white flex items-center justify-center">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:inline-block">{user?.fullName}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="text-sm font-medium">{user?.fullName}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded px-2 py-0.5">
                      {user?.userType === 'investor' ? 'Investor' : 'Startup'}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <NavLink 
                  to="/sign-in" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-finance-blue dark:hover:text-finance-blue transition-colors duration-200"
                >
                  Sign In
                </NavLink>
                <NavLink 
                  to="/sign-up" 
                  className="px-4 py-2 text-sm font-medium rounded-md bg-finance-blue text-white hover:bg-blue-600 transition-colors duration-200"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 shadow-lg overflow-hidden transition-all duration-300 ease-in-out',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => cn(
                  'px-4 py-3 rounded-md transition-colors duration-200',
                  isActive 
                    ? 'bg-blue-50 dark:bg-gray-800 text-finance-blue' 
                    : 'text-gray-700 dark:text-gray-200'
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="mt-6 grid grid-cols-2 gap-2">
            {isAuthenticated ? (
              <>
                <div className="col-span-2 flex items-center gap-2 p-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="h-10 w-10 rounded-full bg-finance-blue text-white flex items-center justify-center">
                    {user?.fullName?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{user?.fullName}</div>
                    <div className="text-xs text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="col-span-2">
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-500 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/sign-in"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-finance-blue dark:hover:text-finance-blue transition-colors duration-200 border border-gray-200 dark:border-gray-700 rounded-md text-center"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-finance-blue text-white hover:bg-blue-600 transition-colors duration-200 text-center"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
