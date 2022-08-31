import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookedCard from "../components/BookedCard";

const BookingTreks = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [BookingTreks, setBookingTreks] = useState([]);

  // intial data fetching
  useEffect(() => {
    setLoading(true);

    axios({
      method: "get",
      url: "/bookings",
      headers: {
        "ngrok-skip-browser-warning": "*",
      },
    })
      .then(({ data }) => {
        console.log(data);
        setBookingTreks(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="App-treks">
      {!loading ? (
        BookingTreks.length > 0 ? (
          BookingTreks.map((trek) => (
            <BookedCard key={trek.id} booking={trek} />
          ))
        ) : (
          <>
            <h1>No Booking Treks</h1>
            <p>
              Go to the <Link to="/">Home</Link> page to add some treks to your
              Bookings
            </p>
          </>
        )
      ) : (
        <>
          <p>loading...</p>
        </>
      )}
    </main>
  );
};

export default BookingTreks;
