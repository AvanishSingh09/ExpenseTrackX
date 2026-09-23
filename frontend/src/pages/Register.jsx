import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { name, email, password });
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error('Registration failed. Email might be in use.');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '450px', marginTop: '4rem' }}>
            <div className="card text-center">
                <div className="mb-4 text-primary flex justify-center">
                    <UserPlus size={48} />
                </div>
                <h2 className="mb-8">Create an Account</h2>
                
                <form onSubmit={handleSubmit} className="flex-col gap-4 text-left">
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input type="email" className="form-control" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
                    </div>
                    <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%', padding: '0.75rem' }}>Register</button>
                </form>
                
                <p className="mt-4 text-muted">
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '500' }}>Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
