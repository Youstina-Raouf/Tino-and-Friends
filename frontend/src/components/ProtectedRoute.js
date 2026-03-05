// ProtectedRoute Component for future use
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function ProtectedRoute({ children }) {
  const { token } = useApp();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
