import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import './index.css';

function App() {
  const [users, setUsers] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    fetchData();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Network response failed');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch data. If you are offline and this is your first visit, you might not have cached data yet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
        <h1>PWA Offline Explorer</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: isOnline ? 'green' : 'red', fontWeight: 'bold' }}>
          {isOnline ? <><Wifi /> Online</> : <><WifiOff /> Offline</>}
        </div>
      </header>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={fetchData} 
          style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <RefreshCw size={16} /> Refresh Data
        </button>
        <span style={{ fontSize: '0.9rem', color: '#666', alignSelf: 'center' }}>
          Workbox caches API requests to placeholder typicode.
        </span>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <div style={{ padding: '16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px' }}>{error}</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {users.map(user => (
            <div key={user.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 8px 0' }}>{user.name}</h3>
              <p style={{ margin: '4px 0', color: '#64748b' }}>{user.email}</p>
              <p style={{ margin: '4px 0', color: '#64748b' }}>{user.company.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
