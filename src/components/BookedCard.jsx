import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookedCard.css";

const BookedCard = ({ booking, onAddToMyBooking, myBookingTreks }) => {
  const { id, name, date } = booking;

  const [loading, setLoading] = useState(true);
  const [trek, setTrek] = useState({});

  useEffect(() => {
    fetch(`/trails/${id}`)
      .then((response) => response.json())
      .then((data) => setTrek(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="Trek">
      <header className="Trek-image">
        <img src={trek.Image} alt="trek" />
        <h2>{trek.name || "loading"}</h2>
      </header>
      <div className="Trek-details">
        <section>
          <strong>Congratulations {name} !</strong>
          <div>
            <div>
              {" "}
              Your trek {trek.name} has been scheduled on{" "}
              {new Date(date).toDateString()}
            </div>
          </div>
          <Link className="Trek-details-link" to={`/treks/${id}`}>
            <strong>...more details</strong>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default BookedCard;
