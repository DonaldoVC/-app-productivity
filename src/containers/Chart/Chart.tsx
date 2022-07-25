import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {getTasks} from "@actions/task.action";

import TaskChart from "@views/TaskChar/TaskChart";

import styles from "./chart.module.scss"


/**
 * Content the chart view
 */
const Chart = () => {
  const dispatch = useDispatch();

  /**
   * Invoke the APIs to the all the sections and the tasks
   */
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return(
    <div className={styles.main}>
      <TaskChart />
    </div>
  );
}

export default Chart;
