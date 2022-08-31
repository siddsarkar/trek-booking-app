import { Link, useNavigate } from "react-router-dom";
import "./TrekCard.css";

const TrekCard = ({ trek, onAddToFavourite, favouriteTrek }) => {
  const { id, name, Image, startAt, endAt, minimumAge, maximumAge, unitPrice } =
    trek;
  const navigate = useNavigate();

  return (
    <div className="Trek">
      <header className="Trek-image">
        <img src={Image || "https://picsum.photos/200/300"} alt="trek" />
        <h2>{name}</h2>
      </header>
      <div className="Trek-details">
        <section>
          <strong>Overview</strong>
          <div>
            <div>Start At: {startAt}</div>
            <div>End At: {endAt}</div>
            <div>Minimum Age: {minimumAge}</div>
            <div>Maximum Age: {maximumAge}</div>
            <div>Unit Price: {unitPrice}</div>
          </div>
          <Link className="Trek-details-link" to={`/treks/${id}`}>
            <strong>...more details</strong>
          </Link>
        </section>
        <section className="Trek-details-actions">
          <button onClick={() => onAddToFavourite(trek)}>
            {favouriteTrek ? "Add to" : "Remove from"} Favourites
          </button>
          <button
            onClick={() =>
              navigate("/treks/book/" + id, {
                state: {
                  trek,
                },
              })
            }
          >
            Book Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default TrekCard;
