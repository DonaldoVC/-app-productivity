type Sections = {
  all_sections: Array<Section>;
  lastStatus: number;
  error: null
}

type NewSection = {
  name: string;
}

type Section = {
  deletedAt: null;
  task_allowed: Array<string>;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

type SectionAction = {
  type: string;
  status: number;
  section: Section;
  all_sections?: Array;
  error: null | string;
}
