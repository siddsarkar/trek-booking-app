import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./BookedCard.css";

const BookedCard = ({ booking, onAddToMyBooking, myBookingTreks }) => {
  const { trailId, name, date } = booking;

  const [loading, setLoading] = useState(true);
  const [trek, setTrek] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: "/trails/"+trailId,
      headers: {
        "ngrok-skip-browser-warning": "*",
      },
    })
      .then(({ data }) => {
        console.log(data);
        setTrek(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="Trek">
      <header className="Trek-image">
        <img src={trek.Image || "https://picsum.photos/200/300"} alt="trek" />
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
          <Link className="Trek-details-link" to={`/treks/${trailId}`}>
            <strong>...more details</strong>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default BookedCard;
