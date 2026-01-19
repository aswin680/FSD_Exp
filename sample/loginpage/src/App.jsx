import { useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const { isLoggedIn, userName, role, logout } = useAuth();

  return (
    <div style={styles.container}>
      <h1>State Management App</h1>
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <>
          <div style={styles.header}>
            <p>Welcome, {userName} ({role})</p>
            <button onClick={logout} style={styles.button}>Logout</button>
          </div>
          <div style={styles.content}>
            <div style={styles.section}>
              <ProductList />
            </div>
            <div style={styles.section}>
              <Cart />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  button: { padding: '8px 16px', cursor: 'pointer' },
  content: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
  section: { padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }
};

export default App;
