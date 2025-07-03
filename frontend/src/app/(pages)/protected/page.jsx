"use client"
import { useEffect, useState } from 'react';

export default function Page() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/protected', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setMessage(data.message || 'Access denied'));
  }, []);

  return <div>{message}</div>;
}