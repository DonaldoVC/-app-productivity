import {FC, SetStateAction, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import TimePicker from 'rc-time-picker';
import moment, {Moment} from "moment";

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import {formatTime} from "@utils/time";

import {BIG, LIMIT, MID, SMALL} from "@constants/time.contant";

import {getSections} from "@actions/section.action";
import {saveTask} from "@actions/task.action";

import selectTask from "@selectors/task.selector";

import {addTaskSchema} from "@schemas/addTask.schema";

import styles from './addTask.module.scss';

interface IAddTask {
  section: Section;
  handleClose: () => void;
}

/**
 *
 * @param section Section data where the task will be created
 * @param handleClose Close modal function
 */
const AddTask: FC<IAddTask> = ({section, handleClose}) => {
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(false);

  const taskSelector = useSelector(selectTask);

  /**
   * Send the form data to the dispatch to create a task into the section
   *
   * @function handleCreate
   *
   * @param values Values from the form
   * @param resetForm Reset form inputs
   */
  const handleCreate = (values: NewTaskForm, resetForm: any) => {
    dispatch(saveTask({...values, section: section._id}));

    /**
     * Make a timeout to close the modal & get the sections
     */
    setTimeout(() => {
      handleClose();
      resetForm();
      if (taskSelector.lastStatus) dispatch(getSections())
    }, 1000);
  }

  /**
   * Valid the value from the selector
   *
   * @function handleChangePicker
   *
   * @param value Current value
   * @param setValues Function to set the new values to the form
   * @param values Current form values
   */
  const handleChangePicker = (value: string, setValues: (values: SetStateAction<any>) => void, values: NewTaskForm) => {
    setShowPicker(value === "picker");

    if (value !== "picker") {
      setValues({...values, estimated: value, time: value, timeSelect: value });
    }
  }

  /**
   * Format and valid the custom time selected
   *
   * @function handlePickTime
   *
   * @param value Current value
   * @param setValues Function to set the new values to the form
   * @param values Current form values
   */
  const handlePickTime = (value: Moment, setValues: (values: SetStateAction<any>) => void, values: NewTaskForm) => {
    if (moment(value).diff(moment().startOf('day'), 'seconds') <= LIMIT) {
      setValues({
        ...values,
        timePicker: moment(value).diff(moment().startOf('day'), 'seconds'),
        estimated: moment(value).diff(moment().startOf('day'), 'seconds'),
        time: moment(value).diff(moment().startOf('day'), 'seconds')
      })
    } else {
      setValues({...values, timePicker: 0, estimated: 0, time: 0})
    }
  }

  return (
    <Modal show onHide={handleClose} size="lg">
      <Modal.Body className={styles.content}>
        <Row className="mt-3">
          <Col>
            <Formik
              initialValues={{} as NewTaskForm}
              validationSchema={addTaskSchema}
              enableReinitialize
              validateOnMount
              onSubmit={(values, { resetForm }) => handleCreate(values, resetForm)}
            >
              {({ isValid, setValues, values, errors }) => (
                <Form>
                  <div>
                    <p>Nombre </p>
                    <Field name="name" render={({ field }: { field: any }) => (
                      <FormControl {...field} as="input" />
                    )}/>
                  </div>

                  <div>
                    <p>Descripción</p>
                    <Field name="description" render={({ field }: { field: any }) => (
                      <FormControl {...field} as="textarea" />
                    )}/>
                  </div>

                  <div className="mt-2">
                    <p>Duración</p>
                    <Field name="timeSelect" render={({ field }: { field: any }) => (
                      <FormControl {...field} as="select" onChange={(event) => handleChangePicker(event.target.value, setValues, values)}>
                        <option value={0}>Selecciona una opción</option>
                        <option value={SMALL}>Corta: 30 min</option>
                        <option value={MID}>Media: 45 min</option>
                        <option value={BIG}>Larga: 1 hr</option>
                        <option value="picker">Otro</option>
                      </FormControl>
                    )}/>

                    {showPicker && (
                      <Field name="timePicker" render={({ field }: { field: any }) => (
                        <TimePicker
                          {...field}
                          value={moment(formatTime(values.timePicker), "HH:mm:ss")}
                          className={styles.picker}
                          onChange={(value: Moment) => handlePickTime(value, setValues, values)}
                        />
                      )}/>
                    )}
                  </div>

                  <div className="mt-4">
                    <Button type="submit" disabled={!isValid} size="sm" variant="success">
                      Crear
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default AddTask;
