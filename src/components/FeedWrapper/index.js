import SearchBar from '../SearchBar';

const FeedWrapper = ({ feedComponent }) => {
  return (
    <div className="row">
      <div className="col-lg-8">
        <SearchBar />
        {feedComponent}
      </div>
      <div className="col-lg-4">
        <ul className="list-group">
          <li className="list-group-item list-group-item">Activity</li>
          <li className="list-group-item list-group-item text-muted fst-italic">
            Follow accounts to see your friends' activity
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FeedWrapper;
