import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/userService';

const Register = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registerUser = () =>
    register(user).then((response) =>
      response.status === 403
        ? response.json().then((res) => setError(res.error))
        : navigate('/profile')
    );

  return (
    <div className="row mt-3 justify-content-center">
      <div className="col-md-7 col-lg-5">
        <h1>Sign Up</h1>
        <p className="form-text">
          Already have an account? <Link to="/login">Log In</Link>
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
        <label for="firstName" className="form-label">
          First Name <span className="form-text">(optional)</span>
        </label>
        <input
          type="text"
          id="firstName"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          placeholder="First name"
        />
        <label for="lastName" className="form-label">
          Last Name <span className="form-text">(optional)</span>
        </label>
        <input
          type="text"
          id="lastName"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          placeholder="Last name"
        />
        <label for="zip" className="form-label">
          Zip Code <span className="form-text">(optional)</span>
        </label>
        <input
          type="text"
          id="zip"
          className="form-control mb-3"
          onChange={(e) => setUser({ ...user, zipCode: e.target.value })}
          placeholder="Zip code"
        />
        <p className="form-label">What role best describes you?</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="roleFan"
            value="FAN"
            checked={user.role === 'FAN'}
            onChange={() => setUser({ ...user, role: 'FAN' })}
          />
          <label className="form-check-label" for="roleFan">
            I'm a music fan
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="rolePromoter"
            value="PROMOTER"
            checked={user.role === 'PROMOTER'}
            onChange={() => setUser({ ...user, role: 'PROMOTER' })}
          />
          <label className="form-check-label" for="rolePromoter">
            I'm an event promoter
          </label>
        </div>
        <p className="form-text text-danger">{error}</p>
        <button
          className="btn btn-primary"
          onClick={registerUser}
          disabled={!user.username || !user.password || !user.role}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
