# productivity-app

## Installation

``` bash
# go into app's directory
$ cd productivity-app

# install app's dependencies
$ yarn install
```

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

### Basic usage

``` bash
# dev server with hot reload at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for development with minification
$ npm run build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
Aplication
├── public/                        #static files
│   ├── assets/                    #assets
│   ├── index.html                 #html template
│   └── manifest.json              #manifest file
│
├── src/                           #project root
│   ├── actions/                   #functions to comunicated with APIs
│   ├── assets/                    #assets files
│   ├── constants/                 #constants source
│   │   └── services/              #contants to manipulate the redux state
│   ├── containers/                #container pages
│   ├── hooks/                     #custom hooks
│   ├── modals/                    #modals to create / edit tasks & create sections
│   ├── reducers/                  #reducers source
│   ├── schemas/                   #schemas to valid the forms
│   ├── scss/                      #scss source
│   ├── selectors/                 #redux selectors
│   ├── types/                     #custom type objects used in the proyect
│   ├── utils/                     #utils for views
│   │   └── format.js              #format time function
│   │
│   ├── views/                     #views source
│   ├── App.js
│   ├── App.test.js
│   ├── config.js                  #data to connect with firebase and api's
│   └── store.js                   #redux store
│
├── .env                           #environments vars
├── craco.config.js                #craco config to use alias paths
├── tsconfig.paths.json            #alias paths
└── package.json
```

## Creators

**Donald VC**
