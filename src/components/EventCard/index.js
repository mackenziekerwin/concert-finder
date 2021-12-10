import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
  <div class="card mb-3" style={{ height: '100%' }}>
    <img
      src={event.images[0].url}
      class="card-img-top"
      alt="..."
      style={{ width: '100%', height: '8rem', objectFit: 'cover' }}
    />
    <div class="card-body">
      <i className="far fa-bookmark float-end" />
      <h6 class="card-title">{event.name}</h6>
      <Link to={`/details/${event.id}`} class="btn btn-primary btn-sm">
        RSVP
      </Link>
    </div>
  </div>
);

export default EventCard;
