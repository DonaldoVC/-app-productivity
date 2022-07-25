import {useEffect, useState} from "react";

/**
 * Hook to get timer for init tasks.
 *
 */
const useTimer: useTimer = (task: Task) => {
  const [time, setTime] = useState(parseInt(task.time, 10));
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTime(parseInt(task.time, 10));
  }, [task.status, task.time, task.estimated]);

  useEffect(() => {
    if (task.status !== 4) {
      setIsRunning(false);
    }
  }, [task.status]);

  useEffect(() => {
    let interval: NodeJS.Timer;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);

      if (time === 0) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }

    return () => {
      clearInterval(interval);
    }
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  }

  const stopTimer = () => {
    setIsRunning(false);
  }

  return { time: time.toString(), isRunning, startTimer, stopTimer };
}

export default useTimer;
