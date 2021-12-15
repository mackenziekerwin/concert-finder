import './App.css';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Details from './pages/Details';
import Privacy from './pages/Privacy';

import events from './reducers/events';
import profile from './reducers/profile';
import activity from './reducers/activity';

import NavBar from './components/NavBar';
import FeedWrapper from './components/FeedWrapper';
import SearchResults from './components/SearchResults';
import ProfileOther from './pages/ProfileOther';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

const reducer = combineReducers({ events, profile, activity });
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<ProfileOther />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
