import { useEffect, useState } from "react";
import axios from "axios";
import TrekCard from "../components/TrekCard";

const Treks = () => {
  // state
  const [loading, setLoading] = useState(true);
  const [treks, setTreks] = useState([]);
  const [filteredTreks, setFilteredTreks] = useState([]);
  const [isFiltering, setIsfiltering] = useState(false);

  // intial data fetching
  useEffect(() => {
    setLoading(true);

    // POST request is sent to add a new trial
    // axios({
    //   method: "post",
    //   url: "/trails",
    //   data: {
    //     name: "Blue Hills",
    //     startAt: "10:00",
    //     endAt: "13:00",
    //     minimumAge: 5,
    //     maximumAge: 9,
    //     unitPrice: 3990,
    //   },
    //   headers: {
    //     "ngrok-skip-browser-warning": "*",
    //   },
    // });

    axios({
      method: "get",
      url: "/trails",
      headers: {
        "ngrok-skip-browser-warning": "*",
      },
    })
      .then(({ data }) => {
        console.log(data);
        setTreks(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddtoFavourites = async (trek) => {
    try {
      let res = await fetch(`/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trek),
      });
      if (res.ok) {
        alert("Trek added to favourites");
      } else {
        alert("Trek already exists in favourites");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = (e) => {
    const search = e.target.value;

    setLoading(true);
    axios({
      method: "get",
      url: `/trails?q=${search}`,
      headers: {
        "ngrok-skip-browser-warning": "*",
      },
    })
      .then(({ data }) => {
        console.log(data);
        setTreks(data);
      })
      .finally(() => setLoading(false));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const age = +formData.get("age");
    let minPrice = +formData.get("minPrice");
    let maxPrice = +formData.get("maxPrice");

    console.log({ age, minPrice, maxPrice });

    function priceFilter(a) {
      if (maxPrice && minPrice) {
        return a.unitPrice >= minPrice && a.unitPrice <= maxPrice;
      } else if (minPrice) {
        return a.unitPrice >= minPrice;
      } else if (maxPrice) {
        return a.unitPrice <= maxPrice;
      }
    }
    function ageFilter(a) {
      return age >= a.minimumAge && age <= a.maximumAge;
    }

    const filters = [];
    if (formData.get("age")) {
      filters.push(ageFilter);
    }
    if (formData.get("minPrice") || formData.get("maxPrice")) {
      filters.push(priceFilter);
    }

    const filtered = filters.reduce((d, f) => d.filter(f), treks);

    console.log({
      treks,
      filtered,
    });
    setFilteredTreks(filtered);
    setIsfiltering(true);
  };

  return (
    <div className="App-Container">
      <main className="App-main">
        <aside className="App-filters">
          <section className="App-search">
            <input
              onKeyUp={delay(handleSearch, 500)}
              type="text"
              placeholder="Search for Treks"
            />
          </section>
          <section>
            <form
              onSubmit={handleFilterSubmit}
              onReset={() => setIsfiltering(false)}
            >
              <br />
              Your Age <input name="age" type="number" />
              <br />
              Min Price <input name="minPrice" type="number" />
              <br />
              Max Price <input name="maxPrice" type="number" />
              <br />
              <br />
              <div className="Filter-buttons">
                <input type="reset" value="Clear" />
                <input required type="submit" value="Submit" />
              </div>
            </form>
          </section>
        </aside>
        <section className="App-treks">
          {isFiltering ? (
            filteredTreks.length > 0 ? (
              filteredTreks.map((trek) => (
                <TrekCard
                  favouriteTrek
                  onAddToFavourite={handleAddtoFavourites}
                  key={trek.id}
                  trek={trek}
                />
              ))
            ) : (
              <div className="No-treks">No Results found</div>
            )
          ) : loading ? (
            <div className="No-treks">Loading...</div>
          ) : treks.length > 0 ? (
            treks.map((trek) => (
              <TrekCard
                favouriteTrek
                onAddToFavourite={handleAddtoFavourites}
                key={trek.id}
                trek={trek}
              />
            ))
          ) : (
            <div className="No-treks">No Treks found</div>
          )}
        </section>
      </main>
    </div>
  );
};

function delay(fn, ms) {
  let timer = 0;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(fn.bind(this, ...args), ms || 0);
  };
}

export default Treks;
