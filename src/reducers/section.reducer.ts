import {
  GET_SECTIONS,
  GET_SECTIONS_ERROR,
  SAVE_SECTION,
  SAVE_SECTION_ERROR
} from "@constants/services/section.service.constant";

const initialState: Sections = {
  all_sections: [],
  lastStatus: 0,
  error: null
};

/**
 * Create the store to save / modify the section info.
 *
 * @param state Current section state
 * @param action Action to be validated in reducer
 */
export default function infoReducer(state = initialState, action: SectionAction) {
  switch (action.type) {
    case SAVE_SECTION:
      const all_sections = state.all_sections;
      all_sections.push(action.section);

      return { ...state, lastStatus: action.status, all_sections, error: null };
    case SAVE_SECTION_ERROR:
      return { ...state, lastStatus: action.status, error: action.error };
    case GET_SECTIONS:
      return { ...state, lastStatus: action.status, all_sections: action.all_sections, error: null };
    case GET_SECTIONS_ERROR:
      return { ...state, lastStatus: action.status, all_sections: [], error: action.error };
    default:
      return state;
  }
}
