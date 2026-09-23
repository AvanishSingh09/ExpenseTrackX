import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Wallet, LogOut, LayoutDashboard, ListPlus, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                <Wallet size={24} />
                Expense Tracker
            </Link>
            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className={`nav-link flex items-center gap-2 ${isActive('/dashboard')}`}>
                            <LayoutDashboard size={18} /> Dashboard
                        </Link>
                        <Link to="/transactions" className={`nav-link flex items-center gap-2 ${isActive('/transactions')}`}>
                            <ListPlus size={18} /> Transactions
                        </Link>
                        <span className="text-muted" style={{ borderLeft: '1px solid #ccc', paddingLeft: '1rem', marginLeft: '0.5rem' }}>
                            {user?.name}
                        </span>
                        <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.4rem 0.8rem' }}>
                            <LogOut size={16} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={`nav-link flex items-center gap-2 ${isActive('/login')}`}>
                            <LogIn size={18} /> Login
                        </Link>
                        <Link to="/register" className={`btn btn-primary flex items-center gap-2`}>
                            <UserPlus size={18} /> Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
