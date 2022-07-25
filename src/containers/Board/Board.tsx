import Sections from "@views/Sections/Sections";

import styles from "./board.module.scss";

/**
 * @module Board
 *
 * Container of board view
 */
const Board = () => {
  return (
    <div className={styles.main}>
      <Sections />
    </div>
  );
}

export default Board;
