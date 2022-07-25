import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
  DroppableProvided,
  DraggableProvided
} from "react-beautiful-dnd";
import {ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";

import {order} from "@actions/task.action";

import funnelIcon from "@assets/funnel.png";
import plusIcon from "@assets/plus.svg";

import {BIG, SMALL} from "@constants/time.contant";

import AddTask from "@modals/AddTask/AddTask";

import Task from "@views/List/Task/Task";

import styles from "./section.module.scss";

interface ISection {
  title?: string;
  section?: Section;
  completed?: boolean;
  allTask: Array<Task>;
}

/**
 * Render a section
 *
 * @param title Section title
 * @param section Section data
 * @param completed To valid if is the completed section
 * @param allTask Task object to be rendered into the section
 */
const Section: FC<ISection> = ({title, section, completed, allTask}) => {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState(0);
  const [showModal, setShowModal] = useState(false);

  /**
   * Valid if it should show the task by filter selected.
   *
   * @function filterTask
   *
   * @param task Task to be filtered by filters
   *
   * @return boolean
   */
  const filterTask = (task: Task): boolean => {
    switch (filter) {
      case 1:
        return task.estimated <= SMALL && task.status !== 2;
      case 2:
        return task.estimated >= SMALL && task.estimated <= BIG && task.status !== 2;
      case 3:
        return task.estimated > BIG && task.status !== 2;
      default:
        return true;
    }
  }

  /**
   * Reorder all the task when a card is moved
   *
   * @function reorder
   *
   * @param list List task to be ordered
   * @param startIndex Index where task were located
   * @param endIndex Index where task is located
   */
  const reorder = (list: Task[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    for (let i = 0; i < result.length; i ++) {
      result[i].order = i + 1;
    }

    return result;
  };

  /**
   * Event then the task drag event ends.
   * Invoke the reorder function and Send the new order to the dispatch.
   *
   * @function onDragEnd
   *
   * @param result Current task position
   */
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      allTask,
      result.source.index,
      result.destination.index
    );

    dispatch(order(items));
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className={styles.main}>
              <div className={styles.head}>
                <p>{completed ? "Completados" : title}</p>

                {!completed && (
                  <DropdownButton
                    className="float-right"
                    as={ButtonGroup}
                    size="sm"
                    drop="end"
                    variant="light"
                    title={(<img src={funnelIcon} alt=""/>)}
                  >
                    <Dropdown.Item className="txt" onClick={setFilter.bind(this,0)}>Todos</Dropdown.Item>
                    <Dropdown.Item className="txt" onClick={setFilter.bind(this,1)}>30 min o menos</Dropdown.Item>
                    <Dropdown.Item className="txt" onClick={setFilter.bind(this,2)}>30 min a 1h</Dropdown.Item>
                    <Dropdown.Item className="txt" onClick={setFilter.bind(this,3)}>Más de 1h</Dropdown.Item>
                  </DropdownButton>
                )}
              </div>

              <div className={styles.body}>
                {!completed && allTask.map((task: Task, index: number) => task.status !== 2 && section?.task_allowed.some((s: string) => s === task._id) && (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided: DraggableProvided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                        <Task task={task} show={filterTask(task)}/>
                      </div>
                    )}
                  </Draggable>
                ))}

                {completed && allTask.map((task: Task, index: number) => task.status === 2 && (
                  <div key={index}>
                    <Task task={task} show/>
                  </div>
                ))}
              </div>

              {!completed && (
                <div className={styles.footer}>
                  <button onClick={setShowModal.bind(this, true)}><img src={plusIcon} alt=""/></button>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {section?._id && showModal && (
        <AddTask handleClose={setShowModal.bind(this, false)} section={section} />
      )}
    </>
  );
}

export default Section;
