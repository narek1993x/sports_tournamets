import * as types from './actionTypes';
import axios from 'axios';

const ROOT_URL = 'https://api-search.staging.win.gg';

export const getTournamentsByTerm = (searchTerm) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.GET_TOURNAMENTS_BY_TERM_REQUEST });
      const { data } = await axios.get(`${ROOT_URL}/search?q=${searchTerm}&index=tournament`);
      const tournaments = data.length ? data[0].documents : [];
      dispatch({ type: types.GET_TOURNAMENTS_BY_TERM_SUCCESS, payload: tournaments });
    } catch (error) {
      dispatch({ type: types.GET_TOURNAMENTS_BY_TERM_ERROR, payload: error });
    }
  };
};

export const addTournamentInBasket = (tournamentId) => {
  return (dispatch, getState) => {
    const { searchResults, savedTournamets } = getState().tournaments;
    const tournament = searchResults.find((t) => t.id === tournamentId);
    const isAlreadyAdded = savedTournamets.some((t) => t.id === tournamentId);

    if (isAlreadyAdded) {
      dispatch(removeTournamentFromBasket(tournamentId));
    } else {
      dispatch({ type: types.ADD_TOURNAMENT_IN_BASKET, payload: tournament });
    }
  };
};

export const removeTournamentFromBasket = (tournamentId) => ({
  type: types.REMOVE_TOURNAMENT_FROM_BASKET,
  payload: tournamentId
});

export const clearTournamentsSarchResults = () => ({
  type: types.CLEAR_TOURNAMENTS_SEARCH_RESULTS
});
