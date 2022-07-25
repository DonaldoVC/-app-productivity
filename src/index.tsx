import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";

import reportWebVitals from './reportWebVitals';
import store from "./store";
import App from './App';

import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);

reportWebVitals();
