import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {VictoryPie} from "victory";
import moment from "moment";

import selectTask from "@selectors/task.selector";

import styles from "./taskChart.module.scss";

/**
 * To render the week Task PieChar
 */
const TaskChart = () => {
  const [data, setData] = useState([] as ChartTask[]);

  const taskSelector = useSelector(selectTask);

  /**
   * Filter the task by category when task changes
   * Set the filter data by range date to the chart
   *
   */
  useEffect(() => {
    const minDate = moment().subtract("days", 7).dayOfYear();
    const maxDate = moment().dayOfYear();

    const filterTask: Task[] = taskSelector.all_tasks.filter((task: Task) => moment(task.createdAt).dayOfYear() >= minDate && moment(task.createdAt).dayOfYear() <= maxDate)

    const completed = filterTask.filter((task: Task) => task.status === 2);
    const notStarted = filterTask.filter((task: Task) => task.status === 1);
    const doing = filterTask.filter((task: Task) => task.status !== 1 && task.status !== 2);

    setData([
      { x: "Sin iniciar", y: notStarted.length },
      { x: "En curso", y: doing.length },
      { x: "Finalizadas", y: completed.length },
    ])
  }, [taskSelector])

  return (
    <div className={styles.main}>
      <h5>{`Tareas del ${moment().subtract("days", 7).date()} al ${moment().date()}`}</h5>

      <svg viewBox="0 0 200 200">
        <VictoryPie
          colorScale={[ "tomato", "orange", "navy" ]}
          data={data}
          style={{ labels: { fontSize: 7 } }}
          standalone={false}
          width={400}
          height={400}
          origin={{ x: 100, y: 100 }}
          radius={50}
        />

        <VictoryPie
          data={data}
          colorScale={[ "tomato", "orange", "navy" ]}
          labelRadius={15}
          width={400}
          height={400}
          style={{ labels: { fontSize: 10, fill: "white" } }}
          labels={({ datum }) => datum.y}
          standalone={false}
          origin={{ x: 100, y: 100 }}
          radius={50}
        />
      </svg>
    </div>
  )
}

export default TaskChart;
