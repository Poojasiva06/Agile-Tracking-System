import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate('/admin-profile')}>User Profiles</button>
      <button onClick={() => navigate('/admin-scrum')}>Manage Scrums</button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default AdminHome;
