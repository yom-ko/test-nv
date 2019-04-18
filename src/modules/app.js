// Actions
export const actions = {
  // Action types
  USER_ATTEMPT_LOGIN: '@app/USER_ATTEMPT_LOGIN',
  USER_LOGIN: '@app/USER_LOGIN',
  USER_REQUEST_LOGOUT: '@app/USER_REQUEST_LOGOUT',
  USER_LOGOUT: '@app/USER_LOGOUT',
  TOKEN_RECEIVE: '@app/TOKEN_RECEIVE',
  PATH_CHANGE: '@app/PATH_CHANGE',
  LISTING_REQUEST: '@app/LISTING_REQUEST',
  LISTING_RECEIVE: '@app/LISTING_RECEIVE',

  attemptToLogUserIn() {
    return {
      type: actions.USER_ATTEMPT_LOGIN
    };
  },

  logUserIn(result) {
    return {
      type: actions.USER_LOGIN,
      payload: {
        result
      }
    };
  },

  requestLogout() {
    return {
      type: actions.USER_REQUEST_LOGOUT
    };
  },

  logUserOut() {
    return {
      type: actions.USER_LOGOUT
    };
  },

  changePath(path) {
    return {
      type: actions.PATH_CHANGE,
      payload: {
        path
      }
    };
  },

  requestListing(token, path) {
    return {
      type: actions.LISTING_REQUEST,
      payload: {
        token,
        path
      }
    };
  },

  receiveListing(listing, path) {
    return {
      type: actions.LISTING_RECEIVE,
      payload: {
        listing,
        path
      }
    };
  }
};

// Selectors
export function getItems(state) {
  let items = [];
  const { listing } = state;

  if (Object.prototype.hasOwnProperty.call(listing, '_embedded')) {
    const { _embedded } = listing;
    const { items: newItems } = _embedded;
    items = newItems;
  }

  return items;
}

// Reducers
export const app = (
  state = {
    isLoggedIn: false,
    loginError: null,
    token: '',
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
        const error = result;
        return {
          ...state,
          loginError: error
        };
      }

      const token = result;
      return {
        ...state,
        token,
        isLoggedIn: true,
        loginError: null
      };
    }

    case actions.USER_LOGOUT: {
      return {
        ...state,
        token: '',
        isLoggedIn: false
      };
    }

    case actions.PATH_CHANGE: {
      const { path } = payload;

      return {
        ...state,
        path
      };
    }

    case actions.LISTING_RECEIVE: {
      const { listing, path } = payload;

      return {
        ...state,
        path,
        listing
      };
    }

    default:
      return state;
  }
};
