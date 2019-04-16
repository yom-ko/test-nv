// Actions
export const actions = {
  // Action types
  LISTING_REQUEST: '@app/LISTING_REQUEST',
  LISTING_RECEIVE: '@app/LISTING_RECEIVE'

  // Actions
};

// Reducers
export const app = (state = {}, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case actions.LISTING_RECEIVE: {
      const { results } = payload;

      return {
        ...state,
        results
      };
    }

    default:
      return state;
  }
};
