import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import EventCard from '../../components/EventCard';
import {
  getUserById,
  getUserPromotions,
  getUserRsvps,
} from '../../services/userService';
import CardRow from '../../components/CardRow';

const ProfileOther = () => {
  // const { events, profile } = useSelector((state) => state);
  const [user, setUser] = useState({});
  const [rsvps, setRsvps] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => getUserById(id).then((user) => setUser(user)), [id]);
  useEffect(() => getUserRsvps(id).then((rsvps) => setRsvps(rsvps)), [id]);
  useEffect(
    () => getUserPromotions(id).then((promotions) => setPromotions(promotions)),
    [id]
  );

  return (
    <div>
      {user && (
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
                {user.firstName} {user.lastName}
              </h1>
              <div className="text-muted">
                @{user.username}
                {/* {isEditing ? (
              <button
                className="btn btn-outline-primary btn-sm ms-2"
                onClick={() => setIsEditing(false)}>
                Save profile
              </button>
            ) : (
              <button
                className="btn btn-outline-primary btn-sm ms-2"
                onClick={() => setIsEditing(true)}>
                Edit profile
              </button>
            )} */}
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              {!!rsvps.length && <CardRow title="RSVPs" cards={rsvps} />}
              {!!promotions.length && (
                <CardRow title="Promoted Events" cards={promotions} />
              )}
              {/* <button className="btn btn-primary" onClick={logoutUser}>
            Log Out
          </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOther;
