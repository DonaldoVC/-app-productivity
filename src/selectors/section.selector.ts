/**
 * Make a selector to get the info saved in the Section store
 *
 * @param store Section state
 */
const selectSection = (store: { section: Sections }) => store.section;

export default selectSection;
