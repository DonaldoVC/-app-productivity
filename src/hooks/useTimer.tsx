import {useEffect, useState} from "react";

/**
 * Hook to get timer for init tasks.
 *
 */
const useTimer: useTimer = (task: Task) => {
  const [time, setTime] = useState(parseInt(task.time, 10));
  const [isRunning, setIsRunning] = useState(false);

  /**
   * Set time to state
   */
  useEffect(() => {
    setTime(parseInt(task.time, 10));
  }, [task.status, task.time, task.estimated]);

  /**
   * Stop timer when status is different at 4
   */
  useEffect(() => {
    if (task.status !== 4) {
      setIsRunning(false);
    }
  }, [task.status]);

  /**
   * Start the timer
   */
  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isRunning) {
      /**
       * Start interval by 1 second
       */
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      /**
       * Stop timer when time is 0
       */
      if (time === 0) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }

    /**
     * Stop timer unmount
     */
    return () => {
      clearInterval(interval);
    }
  }, [isRunning, time]);


  /**
   * Change state to init timer
   */
  const startTimer = () => {
    setIsRunning(true);
  }

  /**
   * Change state to stop timer
   */
  const stopTimer = () => {
    setIsRunning(false);
  }

  return { time: time.toString(), isRunning, startTimer, stopTimer };
}

export default useTimer;
