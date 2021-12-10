import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';

import events from './reducers/events';
import NavBar from './components/NavBar';
import FeedWrapper from './components/FeedWrapper';
import SearchResults from './components/SearchResults';

const reducer = combineReducers({ events });
const store = createStore(reducer);

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <NavBar />
        <div className="container py-3">
          <Routes>
            <Route
              path="/"
              element={<FeedWrapper feedComponent={<Home />} />}
            />
            <Route
              path="/search"
              element={<FeedWrapper feedComponent={<SearchResults />} />}
            />
            <Route
              path="/search/:query"
              element={<FeedWrapper feedComponent={<SearchResults />} />}
            />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
