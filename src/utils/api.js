export const tokenRequestBaseURL = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=3c83236ef96f48d5bc012c6b1c75799e';

export const listingRequestBaseURL = 'https://cloud-api.yandex.net/v1/disk/resources';

// export function requestAuth() {
//   window.location.replace(tokenRequestBaseURL);
// }f

export function removeHash() {
  window.history.pushState('', document.title, window.location.pathname + window.location.search);
}

export function parseResponse(hash = document.location.hash) {
  let token = /access_token=([^&]+)/.exec(hash);

  if (token === null) {
    const [, code] = /error=([^&]+)/.exec(hash);
    const [, description] = /error_description=([^&]+)/.exec(hash);
    return [code, description];
  }

  [, token] = token;
  return token;
}

export function checkResponse(hash = document.location) {
  let result = null;

  if (/token|error/.test(hash)) {
    result = parseResponse(hash);
  }

  return result;
}

export function getListingRequestURL(path) {
  const pathComponent = encodeURIComponent(path);
  return `${listingRequestBaseURL}?path=${pathComponent}`;
}

export function requestListing(token, path) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `OAuth ${token}`);

  const url = getListingRequestURL(path);

  return fetch(url, {
    headers: myHeaders
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log(response);
      throw new Error('Network response was not ok.');
    })
    .catch(error => {
      console.log('A problem with the fetch operation: ', error.message);
    });
}

// export function updateListingForPath(receiveListingAC, changePathAC, path) {
//   const token = localStorage.getItem('myToken');

//   requestListing(token, path).then(data => {
//     receiveListingAC(data);
//   });

//   changePathAC(path);

//   window.history.pushState({ listingPath: path }, '');
// }

// export function attemptToLogIn(logUserInAC, receiveListingAC, path, hash = document.location) {
//   if (/token|error/.test(hash)) {
//     const result = parseResponse(hash);
//     logUserInAC(result);

//     if (typeof result === 'string') {
//       const token = result;
//       localStorage.setItem('myToken', token);

//       window.addEventListener('popstate', event => {
//         const currentToken = localStorage.getItem('myToken');
//         const {
//           state: { listingPath }
//         } = event;

//         requestListing(currentToken, listingPath).then(data => {
//           receiveListingAC(data);
//         });
//       });

//       requestListing(token, path).then(data => {
//         receiveListingAC(data);
//       });

//       window.history.pushState({ listingPath: path }, '');
//     }
//   }
// }
