import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, BookOpen, Trash2, Edit2, PlusCircle } from 'lucide-react';

const API_URL = 'http://localhost:8081/api/students';

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [editId, setEditId] = useState(null);
  const [errorDetails, setErrorDetails] = useState(null);
  
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
      setErrorDetails(null);
    } catch (err) {
      console.error(err);
      setErrorDetails({ _general: "Failed to fetch students. Ensure Spring Boot is running on port 8081." });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (student) => {
    setFormData({ name: student.name, email: student.email, course: student.course });
    setEditId(student.id);
    setErrorDetails(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: '', email: '', course: '' });
      setEditId(null);
      setErrorDetails(null);
      fetchStudents();
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrorDetails(err.response.data);
      } else {
        setErrorDetails({ _general: "Failed to save data." });
      }
    }
  };

  const cancelEdit = () => {
    setFormData({ name: '', email: '', course: '' });
    setEditId(null);
    setErrorDetails(null);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e293b' }}>Student Management Dashboard</h1>
      
      {errorDetails?._general && (
        <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', marginBottom: '16px' }}>
          {errorDetails._general}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        
        {/* Form Panel */}
        <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginTop: 0 }}>{editId ? 'Edit Student' : 'Add New Student'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label>Name</label><br/>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              {errorDetails?.name && <span style={{ color: 'red', fontSize: '12px' }}>{errorDetails.name}</span>}
            </div>
            
            <div>
              <label>Email</label><br/>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              {errorDetails?.email && <span style={{ color: 'red', fontSize: '12px' }}>{errorDetails.email}</span>}
            </div>

            <div>
              <label>Course</label><br/>
              <input type="text" name="course" value={formData.course} onChange={handleInputChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
              {errorDetails?.course && <span style={{ color: 'red', fontSize: '12px' }}>{errorDetails.course}</span>}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" style={{ flex: 1, padding: '10px', background: editId ? '#059669' : '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                {editId ? <Edit2 size={16}/> : <PlusCircle size={16}/>} 
                {editId ? 'Update' : 'Register'}
              </button>
              {editId && (
                <button type="button" onClick={cancelEdit} style={{ padding: '10px', background: '#64748b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* List Panel */}
        <div>
          <h3 style={{ marginTop: 0 }}>Enrolled Students ({students.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {students.length === 0 ? (
              <p style={{ color: '#64748b' }}>No students populated yet. Try adding one to the database.</p>
            ) : (
              students.map(std => (
                <div key={std.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <div>
                    <strong style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1.1rem' }}><User size={16} color="#3b82f6"/> {std.name}</strong>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.9rem', color: '#64748b' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px'}}><Mail size={14}/> {std.email}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px'}}><BookOpen size={14}/> {std.course || 'N/A'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit(std)} style={{ padding: '6px 10px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', color: '#475569' }}><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(std.id)} style={{ padding: '6px 10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16}/></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
