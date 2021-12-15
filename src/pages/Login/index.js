import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/userService';

const Login = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginUser = () =>
    login(user).then((response) =>
      response.status === 403
        ? response.json().then((res) => setError(res.error))
        : navigate('/profile')
    );

  return (
    <div className="row mt-3 justify-content-center">
      <div className="col-md-7 col-lg-5">
        <h1>Log In</h1>
        <p className="form-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
        <label for="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <label for="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <p className="form-text text-danger">{error}</p>
        <button className="btn btn-primary" onClick={loginUser}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;
