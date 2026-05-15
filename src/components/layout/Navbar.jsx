import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { logOut } from '../../firebase/auth';
import { ROUTES } from '../../utils/constants';
import ThemeToggle from '../ui/ThemeToggle';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors hover:text-secondary ${
    isActive ? 'text-secondary' : 'text-text dark:text-slate-300'
  }`;

export default function Navbar() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Signed out successfully');
      navigate(ROUTES.HOME);
    } catch {
      toast.error('Failed to sign out');
    }
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-card/95 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy font-bold text-accent transition-transform group-hover:scale-105">
            TFI
          </div>
          <span className="hidden font-display text-lg font-bold text-navy dark:text-slate-100 sm:block">
            Volunteer Portal
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to={ROUTES.HOME} className={navLinkClass} end>
            Home
          </NavLink>
          {isAuthenticated && (
            <NavLink to={ROUTES.REGISTER} className={navLinkClass}>
              Register
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to={ROUTES.ADMIN} className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <Avatar name={displayName} size="sm" />
                <span className="max-w-[120px] truncate text-sm font-medium text-text dark:text-slate-200">
                  {displayName}
                </span>
              </div>
              {isAdmin && (
                <Link to={ROUTES.ADMIN}>
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to={ROUTES.ADMIN_LOGIN}>
                <Button variant="ghost" size="sm">
                  Admin
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-xl p-2 text-navy dark:text-slate-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 px-4 py-4 md:hidden dark:border-slate-700 animate-fade-in">
          <div className="flex flex-col gap-4">
            <NavLink to={ROUTES.HOME} className={navLinkClass} onClick={() => setMobileOpen(false)} end>
              Home
            </NavLink>
            {isAuthenticated && (
              <NavLink to={ROUTES.REGISTER} className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Register
              </NavLink>
            )}
            {isAdmin && (
              <NavLink to={ROUTES.ADMIN} className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Admin Dashboard
              </NavLink>
            )}
            {isAuthenticated ? (
              <Button variant="outline" onClick={handleLogout}>
                Sign out
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to={ROUTES.ADMIN_LOGIN} onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Admin portal
                  </Button>
                </Link>
                <Link to={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link to={ROUTES.SIGNUP} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Get started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

