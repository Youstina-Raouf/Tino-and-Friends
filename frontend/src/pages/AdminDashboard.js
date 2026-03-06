import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { productService, orderService } from '../services/api';
import '../styles/pages/Home.css'; // Reusing some CSS for buttons if needed

export default function AdminDashboard() {
    const { user } = useApp();
    const navigate = useNavigate();

    // Tabs: 'products' or 'orders' or 'announcements'
    const [activeTab, setActiveTab] = useState('products');
    const [showOnlyToday, setShowOnlyToday] = useState(false);

    // Data State
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Edit Product State
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', price: 0, description: '', image: '', stockQuantity: 0 });

    useEffect(() => {
        // If no user or not an admin, boot them
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        loadData();
    }, [user, navigate]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [productsRes, ordersRes] = await Promise.all([
                productService.getProducts(),
                orderService.getAllOrders()
            ]);
            setProducts(productsRes.data.data);
            setOrders(ordersRes.data.data);
        } catch (err) {
            setError('Failed to fetch dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // --- Product Handlers ---

    const handleUpdateStock = async (id, newQuantity) => {
        if (newQuantity < 0) return;
        try {
            await productService.updateStock(id, newQuantity);
            setProducts(prev => prev.map(p =>
                p._id === id ? { ...p, stockQuantity: newQuantity, available: newQuantity > 0 } : p
            ));
        } catch (err) {
            alert('Failed to update stock');
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await productService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const startEditing = (product) => {
        setEditingProduct(product._id);
        setEditForm({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image || '',
            stockQuantity: product.stockQuantity || 0
        });
    };

    const handleSaveEdit = async () => {
        try {
            const res = await productService.updateProduct(editingProduct, editForm);
            setProducts(prev => prev.map(p => p._id === editingProduct ? res.data.data : p));
            setEditingProduct(null);
        } catch (err) {
            alert('Failed to update product details');
        }
    };

    // --- Order Handlers ---

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await orderService.updateOrderStatus(orderId, newStatus);
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
        } catch (err) {
            alert('Failed to update order status');
        }
    };

    // --- Renderers ---

    if (loading) return <div>Loading Admin Dashboard...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="page-container" style={{ padding: '4rem 2rem', background: 'var(--primary-bg)', minHeight: '100vh' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--secondary-bg)', fontSize: '2.5rem', marginBottom: '3rem' }}>Admin Dashboard</h1>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0', borderBottom: '2px solid rgba(7, 28, 44, 0.1)', paddingBottom: '1.5rem' }}>
                <button
                    onClick={() => setActiveTab('products')}
                    style={{
                        padding: '12px 24px',
                        cursor: 'pointer',
                        backgroundColor: activeTab === 'products' ? 'var(--secondary-bg)' : 'transparent',
                        color: activeTab === 'products' ? 'var(--accent-color)' : 'var(--secondary-bg)',
                        border: activeTab === 'products' ? 'none' : '1px solid var(--secondary-bg)',
                        borderRadius: '4px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                    Manage Products
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    style={{
                        padding: '12px 24px',
                        cursor: 'pointer',
                        backgroundColor: activeTab === 'orders' ? 'var(--secondary-bg)' : 'transparent',
                        color: activeTab === 'orders' ? 'var(--accent-color)' : 'var(--secondary-bg)',
                        border: activeTab === 'orders' ? 'none' : '1px solid var(--secondary-bg)',
                        borderRadius: '4px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                    Manage Orders
                </button>
                <button
                    onClick={() => setActiveTab('announcements')}
                    style={{
                        padding: '12px 24px',
                        cursor: 'pointer',
                        backgroundColor: activeTab === 'announcements' ? 'var(--secondary-bg)' : 'transparent',
                        color: activeTab === 'announcements' ? 'var(--accent-color)' : 'var(--secondary-bg)',
                        border: activeTab === 'announcements' ? 'none' : '1px solid var(--secondary-bg)',
                        borderRadius: '4px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                    Announcements
                </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
                <div style={{ backgroundColor: 'var(--white)', padding: '2.5rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(7,28,44,0.05)', border: '1px solid rgba(219,199,158,0.2)' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--secondary-bg)', marginBottom: '2rem' }}>Inventory Management</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--secondary-bg)', textAlign: 'left', color: 'var(--secondary-bg)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <th style={{ paddingBottom: '1rem' }}>Image</th>
                                <th style={{ paddingBottom: '1rem' }}>Product Details</th>
                                <th style={{ paddingBottom: '1rem' }}>Stock</th>
                                <th style={{ paddingBottom: '1rem' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id} style={{ borderBottom: '1px solid #ddd' }}>
                                    {editingProduct === product._id ? (
                                        <td colSpan="4" style={{ padding: '15px', backgroundColor: '#f9f9f9' }}>
                                            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                                                <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
                                                <input type="text" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} placeholder="Description" />
                                                <input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })} placeholder="Price" />
                                                <input type="text" value={editForm.image} onChange={e => setEditForm({ ...editForm, image: e.target.value })} placeholder="Image URL" />
                                                <div>
                                                    <button onClick={handleSaveEdit} style={{ padding: '5px 10px', backgroundColor: 'green', color: 'white' }}>Save</button>
                                                    <button onClick={() => setEditingProduct(null)} style={{ padding: '5px 10px', marginLeft: '10px' }}>Cancel</button>
                                                </div>
                                            </div>
                                        </td>
                                    ) : (
                                        <>
                                            <td style={{ padding: '10px 0' }}>
                                                {product.image ? <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /> : 'No Image'}
                                            </td>
                                            <td>
                                                <strong>{product.name}</strong><br />
                                                <small>{product.description}</small><br />
                                                {product.price.toFixed(2)} EGP | {product.category}
                                            </td>
                                            <td>
                                                Quantity: {product.stockQuantity || 0} <br />
                                                <button onClick={() => handleUpdateStock(product._id, (product.stockQuantity || 0) + 1)} style={{ cursor: 'pointer' }}>+</button>
                                                <button onClick={() => handleUpdateStock(product._id, Math.max(0, (product.stockQuantity || 0) - 1))} style={{ cursor: 'pointer' }}>-</button>
                                            </td>
                                            <td>
                                                <button onClick={() => startEditing(product)} style={{ marginRight: '10px', cursor: 'pointer' }}>Edit</button>
                                                <button onClick={() => handleDeleteProduct(product._id)} style={{ color: 'red', cursor: 'pointer' }}>Delete</button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'orders' && (
                <div style={{ backgroundColor: 'var(--white)', padding: '2.5rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(7,28,44,0.05)', border: '1px solid rgba(219,199,158,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--secondary-bg)', margin: 0 }}>Order Tracking</h2>
                        <label style={{ color: 'var(--secondary-bg)', fontWeight: 700, cursor: 'pointer' }}>
                            <input type="checkbox" checked={showOnlyToday} onChange={e => setShowOnlyToday(e.target.checked)} style={{ marginRight: '10px' }} />
                            View Today's Orders Only
                        </label>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--secondary-bg)', textAlign: 'left', color: 'var(--secondary-bg)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                <th style={{ paddingBottom: '1rem' }}>ID / Date</th>
                                <th style={{ paddingBottom: '1rem' }}>Customer</th>
                                <th style={{ paddingBottom: '1rem' }}>Items</th>
                                <th style={{ paddingBottom: '1rem' }}>Amount / Status</th>
                                <th style={{ paddingBottom: '1rem' }}>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.filter(o => !showOnlyToday || new Date(o.createdAt).toDateString() === new Date().toDateString()).map(order => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '10px 0' }}>
                                        <small>{order._id}</small><br />
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {order.userId?.name || 'Unknown'}<br />
                                        {order.userId?.phone || 'No phone'}
                                    </td>
                                    <td>
                                        <ul style={{ margin: 0, paddingLeft: '15px', fontSize: '14px' }}>
                                            {order.products.map((item, idx) => (
                                                <li key={idx}>{item.quantity}x {item.productId?.name || 'Deleted Product'}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <strong>{order.totalPrice?.toFixed(2) || '0.00'} EGP</strong><br />
                                        <span style={{
                                            padding: '3px 8px', borderRadius: '12px', fontSize: '12px', color: 'white',
                                            backgroundColor: order.orderStatus === 'completed' || order.orderStatus === 'delivered' ? 'green' : (order.orderStatus === 'cancelled' ? 'red' : 'orange')
                                        }}>
                                            {order.orderStatus.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                            style={{ padding: '5px' }}>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
                <div style={{ backgroundColor: 'var(--white)', padding: '3rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(7,28,44,0.05)', border: '1px solid rgba(219,199,158,0.2)' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--secondary-bg)', marginBottom: '1.5rem' }}>Send SMS Announcement</h2>
                    <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>Broadcast a premium promotional message to all registered friends of Tino.</p>
                    <textarea
                        id="sms-text"
                        rows="5"
                        placeholder="Enter your announcement here..."
                        style={{ width: '100%', padding: '1.5rem', marginBottom: '2rem', borderRadius: '4px', border: '1.5px solid #e1d8c1', fontSize: '1rem', fontFamily: 'Inter, sans-serif' }}
                    ></textarea>
                    <button
                        onClick={() => {
                            const txt = document.getElementById('sms-text').value;
                            if (txt) {
                                alert('SMS Broadcast simulated successfully! Premium announcement sent.');
                                document.getElementById('sms-text').value = '';
                            }
                        }}
                        style={{ padding: '1rem 3rem', backgroundColor: 'var(--secondary-bg)', color: 'var(--accent-color)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        Send Premium Announcement
                    </button>
                </div>
            )}

        </div>
    );
}
