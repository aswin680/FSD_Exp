import React, { useState } from 'react';
import axios from 'axios';
import { Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';

const API_BASE = 'http://localhost:8080/api';

const AuthDashboard = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  
  const [jwt, setJwt] = useState('');
  const [authError, setAuthError] = useState(null);

  const [resourceResponse, setResourceResponse] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { username, password });
      setJwt(res.data.token);
      setAuthError(null);
      setResourceResponse(null); // Clear previous responses
    } catch (err) {
      setJwt('');
      setAuthError('Invalid credentials. Server rejected the login.');
    }
  };

  const handleLogout = () => {
    setJwt('');
    setResourceResponse(null);
  };

  const attemptAccess = async (endpoint) => {
    try {
      const res = await axios.get(`${API_BASE}/resource/${endpoint}`, {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      setResourceResponse({ endpoint, success: true, data: res.data });
    } catch (err) {
      let msg = "Network Error";
      if (err.response) {
        msg = `HTTP ${err.response.status} - ${err.response.status === 403 ? 'Forbidden (Access Denied by Role)' : 'Unauthorized'}`;
      }
      setResourceResponse({ endpoint, success: false, data: msg });
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e293b' }}>Spring Security & JWT Simulator</h1>

      {/* Login Box */}
      <div style={{ padding: '24px', background: jwt ? '#ecfdf5' : '#f8fafc', borderRadius: '8px', border: jwt ? '2px solid #10b981' : '1px solid #cbd5e1', marginBottom: '32px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0 }}>
          {jwt ? <Unlock color="#10b981"/> : <Lock color="#64748b"/>}
          {jwt ? 'Authenticated Instance' : 'Login Required'}
        </h2>
        
        {!jwt ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#475569' }}>Username</label><br/>
              <input type="text" value={username} onChange={e=>setUsername(e.target.value)} style={{ padding: '8px' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.9rem', color: '#475569' }}>Password</label><br/>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ padding: '8px' }} />
            </div>
            <button type="submit" style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Generate JWT</button>
          </form>
        ) : (
          <div>
            <p><strong>Token acquired:</strong> <code style={{ background: '#d1fae5', padding: '4px 8px', borderRadius: '4px', wordBreak: 'break-all' }}>{jwt}</code></p>
            <button onClick={handleLogout} style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Discard Token</button>
          </div>
        )}

        {authError && <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{authError}</p>}
      </div>

      {/* Role Play Area */}
      <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
        <h3 style={{ marginTop: 0 }}>Test @PreAuthorize Endpoints</h3>
        <p style={{ color: '#64748b' }}>Try accessing these endpoints. The JWT token will be automatically injected into the Authorization header.</p>
        
        <div style={{ display: 'flex', gap: '16px', margin: '20px 0' }}>
          <button onClick={() => attemptAccess('public')} style={{ padding: '10px', flex: 1, cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1' }}>/public<br/><small>(Permitted to all)</small></button>
          <button onClick={() => attemptAccess('user')} style={{ padding: '10px', flex: 1, cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1' }}>/user<br/><small>(Requires USER/ADMIN)</small></button>
          <button onClick={() => attemptAccess('admin')} style={{ padding: '10px', flex: 1, cursor: 'pointer', borderRadius: '4px', border: '1px solid #cbd5e1' }}>/admin<br/><small>(Requires ADMIN)</small></button>
        </div>

        {resourceResponse && (
          <div style={{ marginTop: '24px', padding: '16px', borderLeft: `4px solid ${resourceResponse.success ? '#10b981' : '#ef4444'}`, background: 'white' }}>
            <h4 style={{ margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {resourceResponse.success ? <CheckCircle color="#10b981"/> : <XCircle color="#ef4444"/>}
              Response for `/api/resource/{resourceResponse.endpoint}`
            </h4>
            <pre style={{ margin: 0, color: '#334155', whiteSpace: 'pre-wrap' }}>{resourceResponse.data}</pre>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#64748b' }}>
        <strong>Available Test Accounts:</strong><br/>
        - admin / admin123 (ROLE_ADMIN)<br/>
        - user / user123 (ROLE_USER)
      </div>

    </div>
  );
};

export default AuthDashboard;
