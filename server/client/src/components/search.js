//Imports React hooks and Bootstrap components
import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

//Renders the search form, search results, and favourites list
const Search = () => {
  //Declares state variables for search query, search results, favourites list, and search type
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favourites, setFavourites] = useState(
    JSON.parse(sessionStorage.getItem("favourites")) || []
  );
  const [searchType, setSearchType] = useState("song");

  //Handles the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    let url = "";
    if (searchType === "all") {
      url = `https://itunes.apple.com/search?term=${searchQuery}`;
    } else {
      url = `https://itunes.apple.com/search?term=${searchQuery}&entity=${searchType}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.results);
      });
  };

  //Handles adding a result to the favourites list
  const handleFavourite = (result) => {
    const newFavourites = [...favourites];
    const existingFavouriteIndex = favourites.findIndex(
      (favourite) => favourite.trackId === result.trackId
    );
    if (existingFavouriteIndex === -1) {
      newFavourites.push(result);
      setFavourites(newFavourites);
      sessionStorage.setItem("favourites", JSON.stringify(newFavourites));
    }
  };

  //Handles removing a result from the favourites list
  const handleRemoveFavourite = (result) => {
    const newFavourites = favourites.filter(
      (favourite) => favourite.trackId !== result.trackId
    );
    setFavourites(newFavourites);
    sessionStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  //Renders the search form and the search results
  return (
    <div className="container">
      {/* Search form */}
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="type">
          <Form.Label>Search Type:</Form.Label>
          <Form.Control
            as="select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            {/* Search type options */}
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="podcast">Podcasts</option>
            <option value="song">Music</option>
            <option value="audiobook">Audiobooks</option>
            <option value="shortFilm">Short Films</option>
            <option value="tvEpisode">TV Shows</option>
            <option value="software">Software</option>
            <option value="ebook">eBooks</option>
          </Form.Control>
        </Form.Group>
        {/* Search button */}
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <hr />
      {/* Search results */}
      <div className="row">
        {searchResults.map((result) => (
          <div className="col-sm-3 mb-3" key={result.trackId}>
            <Card>
              {/* Image */}
              <Card.Img variant="top" src={result.artworkUrl100} />
              <Card.Body>
                {/* Title */}
                <Card.Title data-testid="card-title">
                  {result.trackName}
                </Card.Title>
                {/* Artist name */}
                <Card.Subtitle className="mb-2 text-muted">
                  {result.artistName}
                </Card.Subtitle>
                {/* Description */}
                <Card.Text>
                  {result.longDescription || result.shortDescription}
                </Card.Text>
                {/* Favourite button */}
                {favourites.some(
                  (favourite) => favourite.trackId === result.trackId
                ) ? (
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFavourite(result)}
                  >
                    Remove Favourite
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleFavourite(result)}
                  >
                    Add Favourite
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
