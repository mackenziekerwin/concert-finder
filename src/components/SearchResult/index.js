import { Link } from 'react-router-dom';

const SearchResult = ({ event }) => (
  <div className="card mt-3">
    <div className="row g-0">
      <div className="col-md-4">
        <img
          src={event.images[0].url}
          style={{ width: '100%' }}
          className="img-fluid rounded-start"
          alt="..."
        />
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <i className="far fa-bookmark float-end"></i>
          <h5 className="card-title">{event.name}</h5>
          <p className="card-text">
            {new Date(event.dates.start.dateTime).toLocaleString('en-US')}
          </p>
          <div className="float-end">
            <Link
              to={`/details/${event.id}`}
              className="btn btn-sm text-primary me-2">
              View Details
            </Link>
            <button className="btn btn-sm btn-outline-primary">RSVP</button>
          </div>
          <p className="card-text">
            {event._embedded?.venues
              .map(
                (venue) =>
                  `${venue.name} · ${venue.city.name}, ${venue.state.stateCode}`
              )
              .join(', ')}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SearchResult;
