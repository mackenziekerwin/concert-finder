import { useEffect } from 'react';
import {
  getEvents,
  getPromotedEvents,
  getNearbyEvents,
} from '../../services/eventService';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CardRow from '../../components/CardRow';

const Home = () => {
  const {
    events: { promotedEvents, allEvents, nearbyEvents },
    profile,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => getPromotedEvents(dispatch), [dispatch]);
  useEffect(() => getEvents(dispatch), [dispatch]);
  useEffect(() => {
    if (profile.zipCode) {
      return getNearbyEvents(dispatch, profile.zipCode);
    }
  }, [dispatch]);

  return (
    <div>
      {profile.zipCode && (
        <CardRow title="Events near you" cards={nearbyEvents.slice(0, 3)} />
      )}
      {!profile._id && (
        <CardRow title="Promoted Events" cards={promotedEvents.slice(0, 3)} />
      )}
      {!!profile.rsvps?.length && (
        <CardRow
          title="Your Upcoming Events"
          cards={profile.rsvps.slice(0, 3)}
        />
      )}
      <Link to="/search" className="float-end">
        See all
      </Link>
      <h2 className="mt-3">Browse All Events</h2>
      <CardRow cards={allEvents.slice(0, 3)} />
    </div>
  );
};

export default Home;
