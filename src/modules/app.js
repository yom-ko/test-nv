// Actions
export const actions = {
  // Action types
  USER_LOGIN: '@app/USER_LOGIN',
  USER_LOGOUT: '@app/USER_LOGOUT',
  LISTING_RECEIVE: '@app/LISTING_RECEIVE',

  logUserIn(result) {
    return {
      type: actions.USER_LOGIN,
      payload: {
        result
      }
    };
  },

  logUserOut() {
    return {
      type: actions.USER_LOGOUT
    };
  },

  receiveListing(listing) {
    return {
      type: actions.LISTING_RECEIVE,
      payload: {
        listing
      }
    };
  }
};

// Reducers
export const app = (
  state = {
    isLoggedIn: false,
    loginError: null,
    items: []
  },
  action = {}
) => {
  const { type, payload } = action;

  switch (type) {
    case actions.USER_LOGIN: {
      const { result } = payload;

      if (Array.isArray(result)) {
        return {
          ...state,
          loginError: result
        };
      }

      return {
        ...state,
        loginError: null,
        isLoggedIn: true
      };
    }

    case actions.USER_LOGOUT: {
      return {
        ...state,
        isLoggedIn: false
      };
    }

    case actions.LISTING_RECEIVE: {
      const { listing } = payload;

      return {
        ...state,
        items: listing
      };
    }

    default:
      return state;
  }
};
