import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Network, Database, Folder, Shield, User } from 'lucide-react';

const API_BASE = 'http://localhost:8081/api';

const JpaDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchData = async () => {
    try {
      const [catRes, userRes] = await Promise.all([
        axios.get(`${API_BASE}/categories`),
        axios.get(`${API_BASE}/users`)
      ]);
      setCategories(catRes.data);
      setUsers(userRes.data);
      setErrorMsg(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to connect to Exp 6 Backend. Ensure MySQL and Spring Boot (port 8081) are running.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Database size={32} color="#8b5cf6" /> JPA Relationship Visualizer
      </h1>
      
      {errorMsg && (
        <div style={{ padding: '16px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px' }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        
        {/* One-To-Many Visualizer */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', background: '#f8fafc' }}>
          <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
            <Network size={24} color="#0ea5e9"/> One-To-Many (Category &rarr; Products)
          </h2>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }}/>
          
          {categories.length === 0 ? <p style={{ color: '#94a3b8' }}>No categories mapped.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {categories.map(cat => (
                <div key={cat.id} style={{ padding: '16px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <strong style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Folder size={18} color="#f59e0b"/> {cat.name}</strong>
                  <div style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid #e2e8f0' }}>
                    {cat.products && cat.products.length > 0 ? (
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {cat.products.map(p => (
                          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#f1f5f9', padding: '8px 12px', borderRadius: '4px' }}>
                            <span>{p.name}</span>
                            <span style={{ fontWeight: 'bold' }}>${p.price}</span>
                          </li>
                        ))}
                      </ul>
                    ) : <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Empty Category</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Many-To-Many Visualizer */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '24px', background: '#f8fafc' }}>
          <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
            <Network size={24} color="#ec4899"/> Many-To-Many (User &harr; Roles)
          </h2>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '16px 0' }}/>
          
          {users.length === 0 ? <p style={{ color: '#94a3b8' }}>No users mapped.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {users.map(user => (
                <div key={user.id} style={{ padding: '16px', background: 'white', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
                  <strong style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}><User size={18} color="#10b981"/> {user.username}</strong>
                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map(role => (
                        <span key={role.id} style={{ background: '#ede9fe', color: '#7c3aed', padding: '4px 10px', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Shield size={14}/> {role.name}
                        </span>
                      ))
                    ) : <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No Roles Assigned</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default JpaDashboard;
