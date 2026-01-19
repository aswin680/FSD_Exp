import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h3>Welcome, {user.name}</h3>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
