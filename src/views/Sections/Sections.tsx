import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getSections} from "@actions/section.action";
import {getTasks} from "@actions/task.action";

import selectSection from "@selectors/section.selector";
import selectTask from "@selectors/task.selector";

import AddSection from "@modals/AddSection/AddSection";

import Section from "@views/List/Section/Section";

import styles from "./sections.module.scss";

/**
 * Render all the sections
 */
const Sections = () => {
  const dispatch = useDispatch();

  const sectionSelector = useSelector(selectSection);
  const taskSelector = useSelector(selectTask);

  const [taskOrdered, setTaskOrdered] = useState({ all_tasks: []});
  const [showModal, setShowModal] = useState(false);

  /**
   * Invoke the APIs to the all the sections and the tasks
   */
  useEffect(() => {
    dispatch(getSections());
    dispatch(getTasks());
  }, [dispatch]);

  /**
   * Order the task by order number and status
   */
  useEffect(() => {
    const taskOrder = taskSelector;

    taskOrder.all_tasks.sort((a: Task, b: Task) => a.order - b.order);
    taskOrder.all_tasks.sort((a: Task, b: Task) => b.status - a.status);

    setTaskOrdered(taskOrder);
  }, [JSON.stringify(taskSelector.all_tasks)])

  return (
    <div className={styles.main}>
      {sectionSelector.all_sections.map((section, index: number) => (
        <div key={index} className={styles.list}>
          <Section allTask={taskOrdered.all_tasks} title={section.name} section={section} />
        </div>
      ))}

      <div className={styles.list}>
        <Section allTask={taskOrdered.all_tasks} completed />
      </div>

      <div className={styles.list}>
        <button onClick={setShowModal.bind(this, true)}>
          Añadir lista
        </button>
      </div>

      {showModal && (
        <AddSection handleClose={setShowModal.bind(this, false)} />
      )}
    </div>
  )
}

export default Sections;
