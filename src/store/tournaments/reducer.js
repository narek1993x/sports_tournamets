import * as types from './actionTypes';

function saveTournaments(tournaments) {
  localStorage.setItem('savedTournamets', JSON.stringify(tournaments));
}

export function getSavedTournaments() {
  const markers = localStorage.getItem('savedTournamets');
  if (markers) {
    return JSON.parse(markers);
  }
  return [];
}

const initialState = {
  loading: false,
  searchResults: [],
  savedTournamets: getSavedTournaments(),
  error: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_TOURNAMENTS_BY_TERM_REQUEST:
      return { ...state, loading: true, searchResults: [] };
    case types.GET_TOURNAMENTS_BY_TERM_SUCCESS:
      return { ...state, searchResults: payload, loading: false };
    case types.GET_TOURNAMENTS_BY_TERM_ERROR:
      return { ...state, error: payload, loading: false, searchResults: [] };

    case types.ADD_TOURNAMENT_IN_BASKET:
      const newTournaments = [...state.savedTournamets, payload];
      saveTournaments(newTournaments);
      return { ...state, savedTournamets: newTournaments };
    case types.REMOVE_TOURNAMENT_FROM_BASKET:
      const savedTournamets = [...state.savedTournamets];
      const removeIndex = savedTournamets.findIndex((t) => t.id === payload);
      const updatedTournaments = [...savedTournamets.slice(0, removeIndex), ...savedTournamets.slice(removeIndex + 1)];
      saveTournaments(updatedTournaments);
      return {
        ...state,
        savedTournamets: updatedTournaments
      };

    case types.CLEAR_TOURNAMENTS_SEARCH_RESULTS:
      return { ...state, searchResults: [] };

    default:
      return state;
  }
};

export default reducer;
