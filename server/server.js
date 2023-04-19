// Import the Express framework
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const helmet = require("helmet");
const port = process.env.SERVER_PORT || 5000;
const path = require("path");

// Create a new instance of the Express application
const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/build")));

// All remaining requests return the React app, so it can handle routing.
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build"));
});

// Enable CORS for all routes
app.use(cors());

// Use the Helmet middleware to secure the app
app.use(helmet());

// Define the route to handle Apple Search API requests
app.get("/apple-search", async (req, res) => {
  // Extract the query parameters from the request
  const { term, entity, limit, media } = req.query;

  // If the required 'term' parameter is not provided, return a 400 error response
  if (!term) {
    return res.status(400).send("The 'term' parameter is required.");
  }

  try {
    // Build the URL for the Apple Search API request based on the provided query parameters
    let url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      term
    )}`;

    if (entity) {
      url += `&entity=${entity}`;
    }

    if (limit) {
      url += `&limit=${limit}`;
    }

    if (media) {
      url += `&media=${media}`;
    }

    // Fetch the data from the Apple Search API
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the response data as JSON and send it back to the client
    const data = await response.json();
    res.send(data);
  } catch (error) {
    // If there's an error fetching the data from the Apple Search API, log it and return a 500 error response
    console.log(error);
    res.status(500).send("Error retrieving data from the Apple Search API");
  }
});

// Start the server and listen on port 5000
app.listen(process.env.port || port, () => {
  console.log(`Server started on ${port}`);
});
