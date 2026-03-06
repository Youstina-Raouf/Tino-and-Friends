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

    return (
        <div className="page-container" style={{ padding: '2rem' }}>
            <h1>My Profile</h1>

            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                <h2>Account Details</h2>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Phone:</strong> {user?.phone}</p>
                <p><strong>Role:</strong> {user?.role}</p>
                <button onClick={logout} style={{ marginTop: '1rem', padding: '10px 20px', backgroundColor: '#c41e3a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2>Past Orders</h2>
                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p>You haven't placed any orders yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {orders.map((order) => (
                            <div key={order._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <strong>Order #{order._id.substring(order._id.length - 6)}</strong>
                                    <span style={{ color: order.orderStatus === 'completed' || order.orderStatus === 'delivered' ? 'green' : 'orange' }}>
                                        {order.orderStatus.toUpperCase()}
                                    </span>
                                </div>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                                <div style={{ marginTop: '10px' }}>
                                    <p><strong>Items:</strong></p>
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                        {order.products.map((item, idx) => (
                                            <li key={idx}>
                                                {item.quantity}x {item.productId?.name || 'Unknown Item'} - ${(item.price * item.quantity).toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
