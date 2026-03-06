import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { orderService } from '../services/api';

export default function Profile() {
    const { user, logout } = useApp();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await orderService.getUserOrders();
                setOrders(data.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) return;
        try {
            await orderService.cancelOrder(orderId);
            // Refresh order status locally
            setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: 'cancelled' } : o));
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to cancel order');
        }
    };

    return (
        <div className="page-container" style={{ padding: '4rem 2rem', background: 'var(--primary-bg)', minHeight: '100vh' }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--secondary-bg)', fontSize: '2.5rem', marginBottom: '3rem' }}>My Profile</h1>

            <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(7,28,44,0.05)', marginBottom: '3rem', border: '1px solid rgba(219,199,158,0.2)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--secondary-bg)', marginBottom: '1.5rem' }}>Account Details</h2>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Name:</strong> {user?.name}</p>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Phone:</strong> {user?.phone}</p>
                <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Role:</strong> <span style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-color)' }}>{user?.role}</span></p>
                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}><strong>Loyalty Points:</strong> <span style={{ color: 'var(--accent-color)', fontWeight: 800 }}>⭐ {user?.loyaltyPoints || 0}</span></p>
                <button onClick={logout} style={{ padding: '0.8rem 2rem', backgroundColor: 'var(--secondary-bg)', color: 'var(--accent-color)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Logout
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(7,28,44,0.05)', border: '1px solid rgba(219,199,158,0.2)' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--secondary-bg)', marginBottom: '2rem' }}>Past Orders</h2>
                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {orders.map((order) => (
                            <div key={order._id} style={{ border: '1px solid #e1d8c1', padding: '2rem', borderRadius: '4px', position: 'relative', background: '#fafaf0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <strong style={{ fontSize: '1.1rem', color: 'var(--secondary-bg)' }}>Order #{order._id.substring(order._id.length - 6)}</strong>
                                    <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', color: order.orderStatus === 'completed' || order.orderStatus === 'delivered' ? '#2e7d32' : (order.orderStatus === 'cancelled' ? '#c62828' : '#e65100') }}>
                                        {order.orderStatus.toUpperCase()}
                                    </span>
                                </div>
                                <p style={{ fontSize: '0.95rem' }}><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--secondary-bg)', marginTop: '0.5rem' }}>Total: {order.totalPrice.toFixed(2)} EGP</p>
                                {order.pickupTime && <p style={{ marginTop: '0.5rem' }}><strong>Requested Time:</strong> {new Date(order.pickupTime).toLocaleString()}</p>}
                                {order.customInstructions && <p style={{ borderLeft: '3px solid var(--accent-color)', paddingLeft: '10px', marginTop: '1rem', fontStyle: 'italic', color: '#555' }}>"{order.customInstructions}"</p>}
                                <div style={{ marginTop: '1.5rem' }}>
                                    <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-color)', marginBottom: '0.5rem', letterSpacing: '1px' }}>Order Items</p>
                                    <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                                        {order.products.map((item, idx) => (
                                            <li key={idx} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', padding: '0.5rem 0' }}>
                                                {item.quantity}x {item.productId?.name || 'Unknown Item'} - <span style={{ fontWeight: 700 }}>{(item.price * item.quantity).toFixed(2)} EGP</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {order.orderStatus === 'pending' && (
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        style={{ marginTop: '1.5rem', padding: '0.5rem 1rem', backgroundColor: 'transparent', color: '#c62828', border: '1px solid #c62828', borderRadius: '4px', cursor: 'pointer', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem' }}
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
