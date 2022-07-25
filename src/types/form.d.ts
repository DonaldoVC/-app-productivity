type SectionForm = {
  name: string;
}

type NewTaskForm = {
  name: string;
  description: string;
  time: number;
  estimated: number;
  section: string;
  timeSelect: string;
  timePicker: string;
}

type ModifyTaskForm = {
  _id: string;
  name: string;
  description: string;
  time: string;
  estimated: number;
  timeSelect?: string;
  timePicker?: string;
  order: number;
  status: number;
  finishedDate: null;
}
