import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MapPin, 
  Calculator, 
  Leaf, 
  NotebookPen, 
  User,
  Mountain
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/planner', label: 'Planner', icon: MapPin },
    { path: '/budget', label: 'Budget', icon: Calculator },
    { path: '/carbon', label: 'Carbon', icon: Leaf },
    { path: '/notes', label: 'Notes', icon: NotebookPen },
    { path: '/map', label: 'Map', icon: Mountain },
    { path: '/dashboard', label: 'Dashboard', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <Mountain className="h-6 w-6" />
            <span>Journey Planner</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button - simplified for now */}
          <div className="md:hidden">
            <button className="p-2 text-muted-foreground hover:text-primary">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;