import Venues from '../Venues';
import SearchBar from '../SearchBar';

const FeedWrapper = ({ feedComponent }) => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <SearchBar />
        {feedComponent}
      </div>
      <div className="col-lg-4">
        <Venues />
      </div>
    </div>
  );
};

export default FeedWrapper;
