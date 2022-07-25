import {FC, SetStateAction, useState} from "react";
import {useDispatch} from "react-redux";
import {Field, Form, Formik} from "formik";
import TimePicker from 'rc-time-picker';
import moment, {Moment} from "moment";
import swal from 'sweetalert';

import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import {formatTime} from "@utils/time";

import {BIG, LIMIT, MID, SMALL} from "@constants/time.contant";

import {changeStatus, deleteTask, modifyTask, reset} from "@actions/task.action";

import {addTaskSchema} from "@schemas/addTask.schema";

import styles from './modifyTask.module.scss';

interface IModifyTask {
  task: Task;
  time: string;
  handleClose: () => void;
  startTimer: () => void;
  stopTimer: () => void;
}

/**
 *
 * @param task Task to be edited
 * @param time Task time
 * @param handleClose Close modal function
 * @param startTimer Stop timer interval
 * @param stopTimer Start timer interval
 */
const ModifyTask: FC<IModifyTask> = ({task, time, handleClose, startTimer, stopTimer}) => {
  const dispatch = useDispatch();

  const [showPicker, setShowPicker] = useState(![SMALL, MID, BIG].some((e) => e === task.estimated));

  /**
   * Send the form data to the dispatch to modify a task
   *
   * @function handleUpdate
   *
   * @param values Values from the form
   * @param resetForm Reset form inputs
   */
  const handleUpdate = (values: ModifyTaskForm, resetForm: any) => {
    dispatch(modifyTask(values));

    handleClose();
    resetForm();
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
  const handleChangePicker = (value: string, setValues: (values: SetStateAction<any>) => void, values: ModifyTaskForm) => {
    setShowPicker(value === "picker");

    if (value !== "picker") {
      setValues({...values, estimated: value, time: value, timeSelect: value});
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
  const handlePickTime = (value: Moment, setValues: (values: SetStateAction<any>) => void, values: ModifyTaskForm) => {
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

  /**
   * Send the status to the dispatch to the API
   * Start/Stop timer
   *
   * @param status Status id
   */
  const handleChangeStatus = (status: number) => {
    if (status === 4) {
      startTimer();
    } else if (status === 3) {
      stopTimer();
    }

    dispatch(changeStatus({...task, time, status}));
  }

  /**
   * Reset the task time
   */
  const handleReset = () => {
    dispatch(reset(task._id))
  }

  /**
   * Show modal to confirm
   * Send the task id to the dispatch
   */
  const handleDeleteTask = () => {
    swal({
      title: "¿Desea eliminar la tarea?",
      text: "Esta acción no se podrá deshacer",
      icon: "warning",
      buttons: ['Cancelar', 'Continuar'],
      dangerMode: true,
    }).then((willDelete) => {

      /**
       * Valid the response
       */
      if (willDelete) {
        dispatch(deleteTask(task._id));
        handleClose();
      }
    });
  }

  return (
    <Modal show onHide={handleClose} size="lg">
      <Modal.Body className={styles.content}>
        <Row>
          <Col>
            <p className={styles.title}>{task.name}</p>
          </Col>
        </Row>
        <Formik
          initialValues={{
            _id: task._id,
            name: task.name,
            description: task.description,
            timeSelect: [SMALL, MID, BIG].some((e) => e === task.estimated) ? task.estimated?.toString() : "picker",
            timePicker: task.estimated?.toString(),
            time: task.estimated?.toString(),
            estimated: task.estimated,
          } as ModifyTaskForm}
          validationSchema={addTaskSchema}
          enableReinitialize
          validateOnMount
          onSubmit={(values, {resetForm}) => handleUpdate(values, resetForm)}
        >
          {({isValid, setValues, values, errors}) => (
            <Form>
              <Row className="mt-3">
                <Col md={9}>
                  <div>
                    <p>Descripción</p>
                    <Field name="description" render={({field}: { field: any }) => (
                      <FormControl {...field} as="textarea"/>
                    )}/>
                  </div>

                  <div className="mt-2">
                    <p>Duración</p>
                    <Field name="timeSelect" render={({field}: { field: any }) => (
                      <FormControl
                        {...field}
                        as="select"
                        onChange={(event) => handleChangePicker(event.target.value, setValues, values)}
                      >
                        <option value={0}>Selecciona una opción</option>
                        <option value={SMALL}>Corta: 30 min</option>
                        <option value={MID}>Media: 45 min</option>
                        <option value={BIG}>Larga: 1 hr</option>
                        <option value="picker">Otro</option>
                      </FormControl>
                    )}/>

                    {showPicker && (
                      <Field name="timePicker" render={({field}: { field: any }) => (
                        <TimePicker
                          {...field}
                          value={moment(formatTime(values.timePicker), "HH:mm:ss")}
                          className={styles.picker}
                          onChange={(value: Moment) => handlePickTime(value, setValues, values)}
                        />
                      )}/>
                    )}
                  </div>
                </Col>

                <Col md={3}>
                  <div className={styles.buttons}>
                    {task.status !== 2 && (
                      <Button type="submit" disabled={!isValid} size="sm" variant="success">
                        Guardar
                      </Button>
                    )}

                    {task.status === 1 && (
                      <Button size="sm" type="button" variant="info" onClick={handleChangeStatus.bind(this, 4)}>
                        Comenzar
                      </Button>
                    )}

                    {task.status === 4 && (
                      <Button size="sm" type="button" variant="info" onClick={handleChangeStatus.bind(this, 3)}>
                        Pausar
                      </Button>
                    )}

                    {task.status === 3 && (
                      <Button size="sm" type="button" variant="info" onClick={handleChangeStatus.bind(this, 4)}>
                        Reanudar
                      </Button>
                    )}

                    {task.status !== 1 && task.status !== 2 && (
                      <Button size="sm" type="button" variant="dark" onClick={handleReset}>
                        Reiniciar
                      </Button>
                    )}

                    {task.status !== 1 && task.status !== 2 && (
                      <Button size="sm" type="button" variant="success" onClick={handleChangeStatus.bind(this, 2)}>
                        Finalizar
                      </Button>
                    )}

                    <Button size="sm" type="button" variant="danger" onClick={handleDeleteTask}>
                      Eliminar
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ModifyTask;
