import {FC, useEffect, useState, useMemo} from "react";

import useTimer from "@hooks/useTimer";

import {formatTime} from "@utils/time";

import ModifyTask from "@modals/ModifyTask/ModifyTask";

import styles from "./task.module.scss"
import {useDispatch} from "react-redux";
import {changeStatus} from "@actions/task.action";

interface ITask {
  task: Task;
  show: boolean;
}

/**
 * Render a task into a section.
 *
 * @param task Task object
 * @param show To valid if the task should be rendered by filters
 */
const Task: FC<ITask> = ({ task, show }) => {
  const dispatch = useDispatch();
  const {time, isRunning, startTimer, stopTimer} = useTimer(task);

  const [showModal, setShowModal] = useState(false);

  /**
   * Add event to know when user try leave the page
   */
  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ''

      if (task.status === 4) {
        dispatch(changeStatus({...task, time, status: 3}))
      }
    }

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  })

  /**
   * Assign the time onto the time state.
   */
  useEffect(() => {
    if (!isRunning && +time === 0 && task.status === 4) {
      dispatch(changeStatus({...task, time, status: 2}))
    }
  }, [isRunning, task, time]);

  return useMemo(() => {
    if (show) {
      return (
        <>
          <div className={styles.main} onClick={setShowModal.bind(this, true)}>
            <p className={styles.title}>{task.name}</p>
            <p className={styles.description}>{task.description}</p>

            <p className={styles.description}>Tiempo: {formatTime(time)}</p>
          </div>

          {showModal && (
            <ModifyTask
              handleClose={setShowModal.bind(this, false)}
              startTimer={startTimer}
              stopTimer={stopTimer}
              time={time}
              task={task}
            />
          )}
        </>
      );
    }

    return null
  }, [show, showModal, JSON.stringify(task), time])
}

export default Task;
