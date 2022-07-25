/**
 * Change the time saved in second into HH:mm:ss
 *
 * @function formatTime
 *
 * @param time Current time to be formatted
 *
 * @return string
 */
export const formatTime = (time: string | undefined): string | null => {
  if (time) {
    const initSec = parseInt(time, 10);
    const hour: number | string = `0${Math.floor(initSec / 3600)}`;
    let minute: number | string = 0;
    let second: number | string = 0;

    if ((Math.floor((initSec - (Math.floor(initSec / 3600) * 3600)) / 60)) >= 10) {
      minute = Math.floor((initSec - (Math.floor(initSec / 3600) * 3600)) / 60);
    } else {
      minute = `0${Math.floor((initSec - (Math.floor(initSec / 3600) * 3600)) / 60)}`
    }

    if ((initSec - (Math.floor(initSec / 3600) * 3600) - (Math.floor((initSec - (Math.floor(initSec / 3600) * 3600)) / 60) * 60)) >= 10) {
      second = initSec - (Math.floor(initSec / 3600) * 3600) - (Math.floor((initSec - (Math.floor(initSec / 3600) * 3600)) / 60) * 60);
    } else {
      second = `0${initSec - (Math.floor(initSec / 3600) * 3600) - (Math.floor((initSec - (Math.floor(initSec / 3600) * 3600)) / 60) * 60)}`
    }

    return `${hour}:${minute}:${second}`;
  }

  return null;
}
