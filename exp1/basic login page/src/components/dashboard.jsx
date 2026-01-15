const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
