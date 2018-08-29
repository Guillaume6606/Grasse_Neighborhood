This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

* Boot instructions
* Listing of the files
* Credits
* Remarks

## Boot instructions

To get start the app:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Listing of the files
```bash
├── README.md - This file.
├── package.json # npm package manager file.
├── package-lock.json # npm package manager file.
├── .gitignore # files for git to ignore
├── public
│   └── index.html # The basic html file that hosts the root and a few cdn scripts
│   └── manifest.json # No clue what this is
└── src
    ├── App.css # Empty styles file
    ├── App.js # This is the root of the app, hosting the main components.
    ├── Header.js # React Component rendering the Header and menu button.
    ├── Map.js # Main React Component that renders the map and its content (markers, windows)
    ├── Sidebar.js # React Component rendering the sidebar with the list of locations and the search options.
    ├── LocationInformation.js # React Component rendering the retreived data of the selected location thanks to Wikipedia  API
    ├── registerServiceWorker.js # Automatically generated service worker
    ├── App.test.js # Unused testing file
    ├── index.css # All of the styling of the page
    └── index.js # Used for DOM rendering only.
```
## Credits

Big thanks to:
- The Udacity team for its awesome course contents
- The Wikipedia API
- SnazzyMaps for their custom google maps styles

## Remarks

There seems to be an issue with my API key, thus the map will display in developper mode
