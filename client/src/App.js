import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Search from "./components/search";
import Favourites from "./components/favourites";

function App() {
  const [favourites, setFavourites] = useState(
    JSON.parse(sessionStorage.getItem("favourites")) || []
  );

  const handleAddToFavourites = (item) => {
    setFavourites([...favourites, item]);
  };

  const handleRemoveFromFavourites = (item) => {
    const updatedFavourites = favourites.filter((fav) => fav.id !== item.id);
    setFavourites(updatedFavourites);
  };

  const saveFavouritesToStorage = (favourites) => {
    sessionStorage.setItem("favourites", JSON.stringify(favourites));
  };

  // Listen to changes in favourites state and save to session storage
  React.useEffect(() => {
    saveFavouritesToStorage(favourites);
  }, [favourites]);

  console.log(sessionStorage);
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Search handleAddToFavourites={handleAddToFavourites} />}
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favourites={favourites}
                handleRemoveFromFavourites={handleRemoveFromFavourites}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
