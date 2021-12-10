import { useEffect, useState } from 'react';
import { getEventById } from '../../services/eventService';
import { useParams } from 'react-router';

const Details = () => {
  const [eventDetails, setEventDetails] = useState({});
  const { id } = useParams();

  useEffect(
    () => getEventById(id).then((event) => setEventDetails(event)),
    [id]
  );

  return (
    <div>
      <h1>{eventDetails.name}</h1>
      {Object.entries(eventDetails).map(([key, value]) => (
        <>
          <h5>{key}</h5>
          <p>{value.toString()}</p>
        </>
      ))}
    </div>
  );
};

export default Details;
