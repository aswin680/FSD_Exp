const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Dashboard</h1>

      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
