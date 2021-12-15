import EventCard from '../EventCard';

const CardRow = ({ title, cards }) => (
  <div className="mt-3">
    {title && <h2>{title}</h2>}
    {
      <div className="row flex-row flex-nowrap overflow-scroll">
        {cards.map((card) => (
          <div className="col-md-4" key={card._id}>
            <EventCard event={card} />
          </div>
        ))}
      </div>
    }
  </div>
);

export default CardRow;
