/**
 * Make a selector to get the info saved in the Task store
 *
 * @param store Task state
 */
const selectTask = (store: { task: Tasks }) => store.task;

export default selectTask;
