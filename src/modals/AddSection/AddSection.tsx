import {FC, useEffect, useRef} from "react";
import { Field, Form, Formik } from "formik";
import {useDispatch} from "react-redux";
import Button from "react-bootstrap/Button";

import {saveSection} from "@actions/section.action";

import {sectionSchema} from "@schemas/section.schema";

import useClickOutside from "@hooks/useClickOutside";

import styles from "./addSection.module.scss";

interface IAddSection {
  handleClose: () => void;
}

/**
 * Modal view to create a Section
 *
 * @param handleClose Close modal function
 */
const AddSection: FC<IAddSection> = ({ handleClose }) => {
  const node = useRef<HTMLHeadingElement>(null);

  const dispatch = useDispatch();

  const [show, setShow] = useClickOutside(node, true);

  /**
   * Valid when the show var change to close the modal.
   */
  useEffect(() => {
    if (!show) handleClose();
  }, [handleClose, show])

  /**
   * Send the form data to the dispatch to create a section
   *
   * @function handleCreate
   *
   * @param values Values passed from the form
   * @param resetForm Reset form function.
   */
  const handleCreate = (values: SectionForm, resetForm: any) => {
    dispatch(saveSection(values));
    resetForm();
    setShow(false);
  }

  return (
    <div className={styles.main}>
      <div ref={node}>
        <p>Nueva lista</p>

        <Formik
          initialValues={{} as SectionForm}
          validationSchema={sectionSchema}
          enableReinitialize
          onSubmit={(values, { resetForm }) => handleCreate(values, resetForm)}
        >
          {({ isValid }) => (
            <Form>
              <div>
                <Field
                  name="name"
                  component="input"
                  autoComplete="off"
                  id="nodeText"
                  autoFocus
                />
              </div>

              <div>
                <Button type="submit" disabled={!isValid} size="sm" variant="success">
                  Crear
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddSection;
