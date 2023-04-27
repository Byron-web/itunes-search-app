import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import Search from "./components/search";

// Test that the App component renders correctly
test("renders App component", () => {
  const { asFragment } = render(<App />);
  // Render the App component and take a snapshot of the rendered output
  expect(asFragment()).toMatchSnapshot();
});

// Test that search results are updated when a search is performed
test("it should update the search results on search", async () => {
  // Mock search results
  const mockResults = [
    {
      trackId: 1,
      artworkUrl100: "https://example.com/image1.png",
      trackName: "Track 1",
      artistName: "Artist 1",
      longDescription: "This is a long description",
      shortDescription: "This is a short description",
    },
    {
      trackId: 2,
      artworkUrl100: "https://example.com/image2.png",
      trackName: "Track 2",
      artistName: "Artist 2",
      longDescription: "This is a long description",
      shortDescription: "This is a short description",
    },
  ];

  const mockFetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ results: mockResults }),
    })
  );
  global.fetch = mockFetch;

  // Render the Search component
  render(<Search />);

  // Simulate a search by changing the value of the search input and clicking the search button
  const searchInput = screen.getByPlaceholderText("Search");
  fireEvent.change(searchInput, { target: { value: "query" } });

  const searchButton = screen.getByText("Search");
  fireEvent.click(searchButton);

  // Verify that fetch is called with the correct URL
  expect(mockFetch).toHaveBeenCalledTimes(1);
  expect(mockFetch).toHaveBeenCalledWith(
    "https://itunes.apple.com/search?term=query&entity=song"
  );

  // Verify that the search results are displayed correctly
  const cardTitles = await screen.findAllByTestId("card-title");
  expect(cardTitles).toHaveLength(2);
  expect(cardTitles[0]).toHaveTextContent("Track 1");
  expect(cardTitles[1]).toHaveTextContent("Track 2");
});
