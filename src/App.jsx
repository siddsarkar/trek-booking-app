import React from "react";
import {
  BrowserRouter,
  NavLink,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import BookingTreks from "./pages/BookingTreks";
import BookTrek from "./pages/BookTrek";
import Details from "./pages/Details";
import FavouriteTreks from "./pages/FavouriteTreks";
import MyBookingTreks from "./pages/MyBookingTreks";
import Treks from "./pages/Treks";
import logo from "./trek-logo.png";

const Layout = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Header-wrapper">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "App-link-active" : "App-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/favourites"
                  className={({ isActive }) =>
                    isActive ? "App-link-active" : "App-link"
                  }
                >
                  Favourites
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    isActive ? "App-link-active" : "App-link"
                  }
                >
                  Bookings
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/mybookings"
                  className={({ isActive }) =>
                    isActive ? "App-link-active" : "App-link"
                  }
                >
                  MyBookings
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Treks />} />
        <Route path="treks">
          <Route path=":trekId" element={<Details />} />
          <Route path="book/:trekId" element={<BookTrek />} />
        </Route>
        <Route path="favourites" element={<FavouriteTreks />} />
        <Route path="bookings" element={<BookingTreks />} />
        <Route path="mybookings" element={<MyBookingTreks />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
