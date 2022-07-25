import {LOADING} from "@constants/loader.contants";

const initialState: Loader = {
  loading: false,
};

/**
 * Create the store to save / modify the Loader.
 *
 * @param state Current loader state
 * @param action Action to be validated in reducer
 */
export default function infoReducer(state = initialState, action: LoaderAction) {
  switch (action.type) {
    case LOADING:
      return {loading: action.loading};
    default:
      return state;
  }
}
