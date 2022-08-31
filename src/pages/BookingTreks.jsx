import React, { useState, useEffect } from "react";

const BookingTreks = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [bookingTreks, setBookingTreks] = useState([]);

  // intial data fetching
  useEffect(() => {
    fetch("/bookings")
      .then((response) => response.json())
      .then((data) => setBookingTreks(data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <main className="App-main">
      {!loading ? (
        <table>
          <thead>
            <tr align="left" bgcolor="#666">
              <th width="400">Name</th>
              <th width="200">Age</th>
              <th width="200">Gender</th>
              <th width="200">Date</th>
            </tr>
          </thead>
          <tbody>
            {bookingTreks.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.age}</td>
                <td>{booking.gender}</td>
                <td>{booking.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <p>loading...</p>
        </>
      )}
    </main>
  );
};

export default BookingTreks;
