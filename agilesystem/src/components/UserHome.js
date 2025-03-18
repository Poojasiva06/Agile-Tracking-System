import { useNavigate } from 'react-router-dom';

function UserHome() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      <h2>Scrum Teams</h2>
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default UserHome;
