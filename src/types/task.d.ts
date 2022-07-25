type Tasks = {
  all_tasks: Array;
  lastStatus: number;
  error: null
}

type Task = {
  status: number;
  finishedDate: null;
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
  time: string;
  estimated: number;
  order: number;
}

type NewSection = {
  name: string;
}

type TaskModify = {
  data: Task
}

type TaskAction = {
  type: string;
  status: number;
  task?: Task;
  all_tasks?: Array;
  error: null | string;
}
