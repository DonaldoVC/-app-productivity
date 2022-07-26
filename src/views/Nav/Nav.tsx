import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import arrowLeft from "@assets/arrow-left.svg";
import arrowRight from "@assets/arrow-right.svg";
import boardIcon from "@assets/board.png";
import chartIcon from "@assets/chart.png";

import {graph} from "@actions/task.action";

import styles from "./nav.module.scss";

/**
 * Render the navigation bar
 */
const Nav = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(true);

  return (
    <div className={show ? styles.main : styles.mainHidden}>
      {show ? (
        <>
          <h3>Productividad</h3>

          <Link to="/board">
            <img src={boardIcon} alt=""/>
            Tablereo
          </Link>
          <Link to="/chart">
            <img src={chartIcon} alt=""/>
            Grafica
          </Link>

          <button className={styles.float} onClick={dispatch.bind(this, graph())}>
            Precargar tareas
          </button>
        </>
      ) : (
        <>
          <h3>P</h3>

          <Link to="/board">
            <img src={boardIcon} alt=""/>
          </Link>
          <Link to="/chart">
            <img src={chartIcon} alt=""/>
          </Link>
        </>
      )}

      <div>
        {show ? (
          <img src={arrowLeft} alt="" onClick={setShow.bind(this, false)} />
        ) : (
          <img src={arrowRight} alt="" onClick={setShow.bind(this, true)}/>
        )}
      </div>

    </div>
  )
}

export default Nav;
