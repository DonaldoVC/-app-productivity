import * as yup from "yup";

/**
 * Create the schema to valid the create section form
 *
 */
export const addTaskSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  time: yup.string().required(),
});
