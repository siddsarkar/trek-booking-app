import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrekCard from "../components/TrekCard";
const FavouriteTreks = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [favouriteTreks, setFavouriteTreks] = useState([]);

  // intial data fetching
  useEffect(() => {
    setLoading(true);

    axios({
      method: "get",
      url: "/favourites",
      headers: {
        "ngrok-skip-browser-warning": "*",
      },
      // axios({
      //   method: "put",
      //   url: "/favourites",
      //   body: {
      //     "customerName": "Ganesh Naik ",
      //     "customerAge": 22,
      //     "gender": "Male",
      //     "trailId": "62c54715feb70159a75e01a6"
      //   },
      //   headers: {
      //     "ngrok-skip-browser-warning": "*",
      //   },
      // });
      // axios({
      //   method: "post",
      //   url: "/favourites",
      //   body: {
      //     customerName: "Ganesh ",
      //     customerAge: 20,
      //     gender: "Male",
      //     trailId: "62c54715feb70159a75e01a6",
      //   },
      //   headers: {
      //     "ngrok-skip-browser-warning": "*",
      //   },
      // axios({
      //   method: "delete",
      //   url: "/favourites",
      //   body:{
      //     "id": "62cd26d957352f6ffc162c5b",
      //     "customerName": "Ganesh ",
      //     "customerAge": 20,
      //     "gender": "Male",
      //     "trailId": "62c54715feb70159a75e01a6"

      //   }
      // })
    })
      .then(({ data }) => {
        console.log(data);
        setFavouriteTreks(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRemoveFavourites = async (trek) => {
    try {
      let res = await fetch(`/favorites/${trek.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Trek removed from favourites");
      } else {
        alert("Trek already removed form favorites");
      }
    } catch (error) {
      alert(error);
    }

    setLoading(true);
    fetch("/favorites")
      .then((response) => response.json())
      .then((data) => setFavouriteTreks(data))
      .finally(() => setLoading(false));
  };

  return (
    <main className="App-treks">
      {!loading ? (
        favouriteTreks.length > 0 ? (
          favouriteTreks.map((trek) => (
            <TrekCard
              onAddToFavourite={handleRemoveFavourites}
              key={trek.id}
              trek={trek}
            />
          ))
        ) : (
          <>
            <h1>No Favourite Treks</h1>
            <p>
              Go to the <Link to="/">Home</Link> page to add some treks to your
              favourites
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

export default FavouriteTreks;
