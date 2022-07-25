import * as yup from "yup";

/**
 * Create the schema to valid the create section form
 *
 */
export const sectionSchema = yup.object().shape({
  name: yup.string().required(),
});
