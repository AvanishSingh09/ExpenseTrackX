import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Trash2, Edit, Plus, FilterX, Activity } from 'lucide-react';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filters
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            let query = '?';
            if (type) query += `type=${type}&`;
            if (category) query += `category=${category}&`;
            if (date) query += `date=${date}&`;
            
            const response = await api.get(`/transactions${query}`);
            setTransactions(response.data);
        } catch (error) {
            toast.error("Failed to load transactions");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [type, category, date]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await api.delete(`/transactions/${id}`);
                toast.success('Transaction deleted');
                fetchTransactions();
            } catch (error) {
                toast.error("Failed to delete transaction");
            }
        }
    };

    return (
        <div className="container">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl">Transactions</h2>
                <Link to="/add-transaction" className="btn btn-primary">
                    <Plus size={18} /> Add Transaction
                </Link>
            </div>

            <div className="card mb-8">
                <div className="flex gap-4 items-center" style={{ flexWrap: 'wrap' }}>
                    <select className="form-control" style={{ width: 'auto' }} value={type} onChange={e => setType(e.target.value)}>
                        <option value="">All Types</option>
                        <option value="INCOME">Income</option>
                        <option value="EXPENSE">Expense</option>
                    </select>

                    <select className="form-control" style={{ width: 'auto' }} value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="FOOD">Food</option>
                        <option value="TRAVEL">Travel</option>
                        <option value="SHOPPING">Shopping</option>
                        <option value="BILLS">Bills</option>
                        <option value="ENTERTAINMENT">Entertainment</option>
                        <option value="HEALTH">Health</option>
                        <option value="EDUCATION">Education</option>
                        <option value="SALARY">Salary</option>
                        <option value="OTHER">Other</option>
                    </select>

                    <input type="date" className="form-control" style={{ width: 'auto' }} value={date} onChange={e => setDate(e.target.value)} />
                    
                    <button className="btn btn-outline" onClick={() => { setType(''); setCategory(''); setDate(''); }}>
                        <FilterX size={18} /> Clear Filters
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-8">
                    <Activity className="text-primary" style={{ animation: 'spin 2s linear infinite' }} size={48} />
                </div>
            ) : transactions.length === 0 ? (
                <div className="card text-center py-8 text-muted">
                    <p>No transactions found matching your filters.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td>{t.date}</td>
                                    <td style={{ fontWeight: '500' }}>{t.title}</td>
                                    <td>
                                        <span style={{ padding: '0.25rem 0.5rem', background: '#F3F4F6', borderRadius: '4px', fontSize: '0.875rem' }}>
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className={t.type === 'INCOME' ? 'text-success' : 'text-danger'} style={{ fontWeight: '600' }}>
                                        {t.type}
                                    </td>
                                    <td style={{ fontWeight: '600' }}>₹{t.amount}</td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => navigate(`/edit-transaction/${t.id}`)}>
                                                <Edit size={16} />
                                            </button>
                                            <button className="btn btn-outline text-danger" style={{ padding: '0.25rem 0.5rem' }} onClick={() => handleDelete(t.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Transactions;
