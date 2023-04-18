import React from "react";
import { Card, Button } from "react-bootstrap";

// define Favourites component
const Favourites = () => {
  // load favourites from sessionStorage or create an empty array
  const favourites = JSON.parse(sessionStorage.getItem("favourites")) || [];

  // function to handle removing a favourite
  const handleRemoveFavourite = (result) => {
    // filter out the favourite to remove from the array
    const newFavourites = favourites.filter(
      (favourite) => favourite.trackId !== result.trackId
    );
    // save updated favourites to sessionStorage
    sessionStorage.setItem("favourites", JSON.stringify(newFavourites));
    window.location.reload(); // refresh page after removing favourite
  };

  // render the favourites list
  return (
    <div className="container">
      <h2>Favourites</h2>
      {favourites.length === 0 ? (
        <p>You have no favourites</p>
      ) : (
        <div className="row">
          {/* map over each favourite and render a Card component */}
          {favourites.map((favourite) => (
            <div className="col-sm-3 mb-3" key={favourite.trackId}>
              <Card>
                <Card.Img variant="top" src={favourite.artworkUrl100} />
                <Card.Body>
                  <Card.Title>{favourite.trackName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {favourite.artistName}
                  </Card.Subtitle>
                  <Card.Text>{favourite.longDescription}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFavourite(favourite)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
