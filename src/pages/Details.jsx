import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TrekDetails from "../components/TrekDetails";
const Details = () => {
  const { trekId } = useParams();

  const [loading, setLoading] = useState(true);
  const [trek, setTrek] = useState({});
  useEffect(() => {
    fetch(`/treks/${trekId}`)
      .then((response) => response.json())
      .then((data) => setTrek(data))
      .finally(() => setLoading(false));
  }, [trekId]);

  return (
    <div className="Details">
      {loading ? <div>Loading...</div> : <TrekDetails trek={trek} />}

      <Link className="Details-back" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export default Details;
