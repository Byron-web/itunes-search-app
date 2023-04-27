# iTunes Search App

This is a simple web application that allows users to search for music albums and tracks on the iTunes Store, and save their favorite results to a local storage for later viewing. The app was built using React for the frontend, and Node.js/Express for the backend.

## Installation

To run the app locally, you will need to have Node.js and npm (or yarn) installed on your system. Then, follow these steps:

1.  Clone this repository to your local machine:

    bashCopy code

    `git clone https://github.com/Byron-web/itunes-search-app.git`

2.  Install the dependencies for both the frontend and backend:

    bashCopy code

    `cd itunes-search-app/frontend
    npm install

    cd ../backend
    npm install`

3.  Start the backend server:

    bashCopy code

    `cd ../backend
npm start`

4.  Start the frontend development server:

    bashCopy code

    `cd ../frontend
npm start`

    The app should now be running at `http://localhost:3000`.

## Usage

To use the app, simply type a search query in the input field on the homepage, and hit Enter or click the "Search" button. The app will retrieve the search results from the iTunes API and display them in a grid of cards, each containing the album or track artwork, name, artist, and description.

To save a result to your favorites list, click the "Add to Favorites" button on the corresponding card. The app will store the result in your local storage, and you can view your favorites by clicking the "Favorites" link in the navigation bar.

To remove a result from your favorites list, click the "Delete" button on the corresponding card in the favorites page.

## Deployment

The app is currently deployed on Heroku, and can be accessed at: [https://byron-web-itunes-search-app.herokuapp.com/](https://byron-web-itunes-search-app.herokuapp.com/)

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

If you find any bugs or issues with the app, feel free to open an issue or submit a pull request on GitHub. Any contributions are welcome!

Thank you for checking out my iTunes Search App!
