import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, DollarSign, Activity, LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get('/dashboard');
                setDashboardData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };
        fetchDashboard();
    }, []);

    if (!dashboardData) return (
        <div className="container flex justify-center items-center" style={{ minHeight: '60vh' }}>
            <Activity className="text-primary" style={{ animation: 'spin 2s linear infinite' }} size={48} />
        </div>
    );

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8B5CF6', '#EC4899', '#EF4444', '#10B981'];
    const pieData = Object.keys(dashboardData.categorySummary).map(key => ({
        name: key,
        value: dashboardData.categorySummary[key]
    }));

    return (
        <div className="container">
            <h2 className="mb-8 text-2xl flex items-center gap-2"><LayoutDashboard className="text-primary" /> Overview</h2>
            
            <div className="flex gap-4 mb-8" style={{ flexWrap: 'wrap' }}>
                <div className="card" style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(79, 70, 229, 0.1)', borderRadius: '50%' }}>
                        <DollarSign className="text-primary" size={32} />
                    </div>
                    <div>
                        <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase' }}>Total Balance</p>
                        <h3 className="text-2xl">₹{dashboardData.balance}</h3>
                    </div>
                </div>

                <div className="card" style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%' }}>
                        <ArrowUpCircle className="text-success" size={32} />
                    </div>
                    <div>
                        <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase' }}>Total Income</p>
                        <h3 className="text-2xl text-success">₹{dashboardData.totalIncome}</h3>
                    </div>
                </div>

                <div className="card" style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '50%' }}>
                        <ArrowDownCircle className="text-danger" size={32} />
                    </div>
                    <div>
                        <p className="text-muted" style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase' }}>Total Expenses</p>
                        <h3 className="text-2xl text-danger">₹{dashboardData.totalExpense}</h3>
                    </div>
                </div>
            </div>

            <div className="flex gap-4" style={{ flexWrap: 'wrap' }}>
                <div className="card" style={{ flex: '2 1 400px' }}>
                    <h3 className="mb-4 text-muted">Expense Distribution</h3>
                    {pieData.length > 0 ? (
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `₹${value}`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center text-muted" style={{ height: '300px' }}>
                            <p>No expense data available for chart.</p>
                        </div>
                    )}
                </div>

                <div className="card" style={{ flex: '3 1 500px' }}>
                    <h3 className="mb-4 text-muted flex items-center justify-between">
                        Recent Transactions
                    </h3>
                    
                    {dashboardData.recentTransactions.length > 0 ? (
                        <div className="flex-col gap-4">
                            {dashboardData.recentTransactions.map(t => (
                                <div key={t.id} className="flex justify-between items-center" style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                                    <div className="flex items-center gap-4">
                                        <div style={{ padding: '0.75rem', background: '#F3F4F6', borderRadius: '50%' }}>
                                            {t.type === 'INCOME' ? <ArrowUpCircle className="text-success" size={24} /> : <ArrowDownCircle className="text-danger" size={24} />}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '500' }}>{t.title}</p>
                                            <p className="text-muted" style={{ fontSize: '0.875rem' }}>{t.category} • {t.date}</p>
                                        </div>
                                    </div>
                                    <div style={{ fontWeight: '600', fontSize: '1.125rem' }} className={t.type === 'INCOME' ? 'text-success' : 'text-danger'}>
                                        {t.type === 'INCOME' ? '+' : '-'}₹{t.amount}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted text-center mt-8">No recent transactions to display.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
