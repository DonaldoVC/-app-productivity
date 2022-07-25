/**
 * Make a selector to get the status saved in the Loader store
 *
 * @param store Loader state
 */
const selectLoader = (store: { loader: Loader }) => store.loader;

export default selectLoader;
