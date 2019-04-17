// Actions
export const actions = {
  // Action types
  USER_LOGIN: '@app/USER_LOGIN',
  USER_LOGOUT: '@app/USER_LOGOUT',
  PATH_CHANGE: '@app/PATH_CHANGE',
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

  changePath(newPath) {
    return {
      type: actions.PATH_CHANGE,
      payload: {
        newPath
      }
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
    path: '/',
    listing: {}
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

    case actions.PATH_CHANGE: {
      const { newPath } = payload;

      return {
        ...state,
        path: newPath
      };
    }

    case actions.LISTING_RECEIVE: {
      const { listing } = payload;

      return {
        ...state,
        listing
      };
    }

    default:
      return state;
  }
};
