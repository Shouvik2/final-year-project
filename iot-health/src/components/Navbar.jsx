import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-xl font-bold">Health Monitor</Link>
      <div>
        <span className="mr-4">Welcome, {user?.name}</span>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
