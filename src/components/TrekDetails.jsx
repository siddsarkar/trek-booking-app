import "./TrekDetails.css";

const TrekDetails = ({ trek }) => {
  const { name, Image, startAt, endAt, minimumAge, maximumAge, unitPrice } =
    trek;
  return (
    <div className="TrekDetails">
      <h1>{name}</h1>
      <div>
        <img src={Image} alt="trek" />

        <p style={{ margin: "10px 0" }}>
          <em>
            Climbing mountains will teach you patience, persistence and
            gratitude. Climbing a mountain is the furthest thing from easy. Long
            stretches of constant vertical climbing can be the most exhausting
            and hardest thing you do. Not only the physical difficulties but
            also the mental difficulties will also test you.
          </em>
        </p>
        <div>
          <div>Start At: {startAt}</div>
          <div>End At: {endAt}</div>
          <div>Minimum Age: {minimumAge}</div>
          <div>Maximum Age: {maximumAge}</div>
          <div>Unit Price: {unitPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default TrekDetails;
