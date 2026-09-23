import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { Save, ArrowLeft } from 'lucide-react';

const AddTransaction = () => {
    const { id } = useParams(); // If present, we are editing
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        type: 'EXPENSE',
        category: 'FOOD',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchTransaction = async () => {
                try {
                    const response = await api.get(`/transactions/${id}`);
                    setFormData({
                        ...response.data,
                        date: response.data.date
                    });
                } catch (err) {
                    toast.error('Failed to fetch transaction data');
                    navigate('/transactions');
                }
            };
            fetchTransaction();
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (id) {
                await api.put(`/transactions/${id}`, formData);
                toast.success('Transaction updated!');
            } else {
                await api.post('/transactions', formData);
                toast.success('Transaction created!');
            }
            navigate('/transactions');
        } catch (err) {
            toast.error('Failed to save transaction');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px' }}>
            <Link to="/transactions" className="btn btn-outline mb-8">
                <ArrowLeft size={18} /> Back to Transactions
            </Link>
            
            <div className="card">
                <h2 className="mb-8">{id ? 'Edit Transaction' : 'Add New Transaction'}</h2>
                
                <form onSubmit={handleSubmit} className="flex-col gap-4">
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g., Grocery Shopping" />
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Amount (₹)</label>
                            <input type="number" className="form-control" name="amount" value={formData.amount} onChange={handleChange} required min="1" placeholder="500" />
                        </div>
                        
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Date</label>
                            <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Transaction Type</label>
                            <select className="form-control" name="type" value={formData.type} onChange={handleChange}>
                                <option value="EXPENSE">Expense</option>
                                <option value="INCOME">Income</option>
                            </select>
                        </div>
                        
                        <div className="form-group" style={{ flex: 1 }}>
                            <label className="form-label">Category</label>
                            <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                                {formData.type === 'INCOME' ? (
                                    <>
                                        <option value="SALARY">Salary</option>
                                        <option value="OTHER">Other</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="FOOD">Food</option>
                                        <option value="TRAVEL">Travel</option>
                                        <option value="SHOPPING">Shopping</option>
                                        <option value="BILLS">Bills</option>
                                        <option value="ENTERTAINMENT">Entertainment</option>
                                        <option value="HEALTH">Health</option>
                                        <option value="EDUCATION">Education</option>
                                        <option value="OTHER">Other</option>
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="form-label">Description (Optional)</label>
                        <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Additional details..." />
                    </div>
                    
                    <button type="submit" className="btn btn-primary mt-4" disabled={loading} style={{ width: '100%', padding: '0.75rem' }}>
                        <Save size={18} /> {loading ? 'Saving...' : 'Save Transaction'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTransaction;
