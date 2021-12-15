import { useEffect, useState } from 'react';
import { getEventById } from '../../services/eventService';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import EventCard from '../../components/EventCard';
import { getProfile, logout, updateUser } from '../../services/userService';
import CardRow from '../../components/CardRow';
import VenueCard from '../../components/VenueCard';

const Profile = () => {
  const { events, profile } = useSelector((state) => state);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(
    () =>
      getProfile()
        .then((user) => {
          dispatch({ type: 'get-profile', user });
          setUser(user);
        })
        .catch((e) => navigate('/login')),
    []
  );

  const logoutUser = () =>
    logout().then((status) => {
      dispatch({ type: 'logout' });
      navigate('/');
    });

  const editProfile = () =>
    updateUser(user).then((user) => dispatch({ type: 'get-profile', user }));

  return (
    <div>
      <div className="row g-5 mb-3 align-items-end">
        <div className="col-3">
          <img
            src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            alt="default avatar"
            className="w-100 rounded"
          />
        </div>
        <div className="col-9">
          <h1>
            {profile.firstName} {profile.lastName}
          </h1>
          <div className="text-muted">
            @{profile.username}
            {isEditing ? (
              <button
                className="btn btn-outline-primary btn-sm ms-2"
                onClick={() => {
                  setIsEditing(false);
                  editProfile();
                }}>
                Save profile
              </button>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm ms-2"
                onClick={() => setIsEditing(true)}>
                Edit profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-lg-3">
          <label for="username" className="form-label">
            Username
          </label>
          {isEditing ? (
            <input
              type="text"
              id="username"
              className="form-control form-control-sm mb-3"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
              placeholder="Username"
            />
          ) : (
            <p>{user.username}</p>
          )}
          <label for="password" className="form-label">
            Password
          </label>
          {isEditing ? (
            <input
              type="password"
              id="password"
              className="form-control form-control-sm mb-3"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              placeholder="Password"
            />
          ) : (
            <p>{user.password}</p>
          )}
          <label for="zip" className="form-label">
            Zip Code
          </label>
          {isEditing ? (
            <input
              type="text"
              id="username"
              className="form-control form-control-sm mb-3"
              onChange={(e) => setUser({ ...user, zipCode: e.target.value })}
              value={user.zipCode}
              placeholder="Zip Code"
            />
          ) : (
            <p>{user.zipCode}</p>
          )}
          <button className="btn btn-primary" onClick={logoutUser}>
            Log Out
          </button>
        </div>
        <div className="col-lg-9">
          {profile.rsvps && <CardRow title="RSVPs" cards={profile.rsvps} />}
          {profile.savedEvents && (
            <CardRow title="Saved Events" cards={profile.savedEvents} />
          )}
          {profile.promotedEvents && (
            <CardRow title="Promoted Events" cards={profile.promotedEvents} />
          )}
          {!!profile.favoriteVenues?.length && (
            <>
              <h2 className="mt-3">Favorite Venues</h2>
              <div className="row">
                {profile.favoriteVenues.map((venue) => (
                  <div className="col-4">
                    <VenueCard
                      id={venue._id}
                      name={venue.name}
                      city={venue.city}
                      state={venue.state}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
