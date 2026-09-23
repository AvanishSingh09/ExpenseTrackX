import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import { LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token, response.data.user);
            toast.success('Logged in successfully!');
            navigate('/dashboard');
        } catch (err) {
            toast.error('Invalid email or password');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '450px', marginTop: '4rem' }}>
            <div className="card text-center">
                <div className="mb-4 text-primary flex justify-center">
                    <LogIn size={48} />
                </div>
                <h2 className="mb-8">Welcome Back</h2>
                
                <form onSubmit={handleSubmit} className="flex-col gap-4 text-left">
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%', padding: '0.75rem' }}>Login</button>
                </form>
                
                <p className="mt-4 text-muted">
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '500' }}>Create one</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
