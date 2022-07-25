type useClickOutside = (node: any, initial?: boolean) => [
  boolean,
  (value: (((prevState: boolean) => boolean) | boolean)) => void
];

type useTimer = (task: Task) => {
  isRunning: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  time: string;
}
