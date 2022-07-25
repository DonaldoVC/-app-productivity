import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import Board from "@containers/Board/Board";
import Chart from "@containers/Chart/Chart";

import Loader from "@views/Loader/Loader";
import Nav from "@views/Nav/Nav";

import styles from "./app.module.scss";

/**
 * Content all the containers, navbar and loader
 */
function App() {
  return (
    <>
      <div className={styles.main}>
        <Nav />
        <Routes>
          <Route
            path="/board"
            element={<Board />}
          />
          <Route
            path="/chart"
            element={<Chart />}
          />

          <Route path="*" element={<Navigate to="/board" />} />
        </Routes>
      </div>
      <Loader />
    </>
  );
}

export default App;
