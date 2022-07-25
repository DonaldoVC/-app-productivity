import axios from "axios";

import {LOADING} from "@constants/loader.contants";
import {
  GET_SECTIONS,
  GET_SECTIONS_ERROR,
  SAVE_SECTION,
  SAVE_SECTION_ERROR
} from "@constants/services/section.service.constant";

/**
 * Save a section.
 *
 * @param section Section data
 */
export const saveSection = (section: NewSection) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: LOADING, loading: true });

      const response = await axios.post(`${process.env.REACT_APP_API}/section`, {data: section});

      dispatch({
        type: SAVE_SECTION,
        section: response.data,
        status: response.status
      });

      dispatch({ type: LOADING, loading: false });
    } catch (e) {
      dispatch({
        type: SAVE_SECTION_ERROR,
        error: e,
        status: 500
      });

      dispatch({ type: LOADING, loading: false });
    }
  }
}

/**
 * Get all saved sections.
 */
export const getSections = () => async (dispatchEvent: any) => {
  try {
    dispatchEvent({ type: LOADING, loading: true });

    const response = await axios.get(`${process.env.REACT_APP_API}/section`);

    dispatchEvent({
      type: GET_SECTIONS,
      all_sections: response.data,
      status: response.status
    });
    dispatchEvent({ type: LOADING, loading: false });
  } catch (e: any) {
    dispatchEvent({
      type: GET_SECTIONS_ERROR,
      error: e,
      status: 500
    });
    dispatchEvent({ type: LOADING, loading: false });
  }
};
