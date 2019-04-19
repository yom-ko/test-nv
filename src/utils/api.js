export const tokenRequestBaseURL = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=3c83236ef96f48d5bc012c6b1c75799e';

export const listingRequestBaseURL = 'https://cloud-api.yandex.net/v1/disk/resources';

// export function removeHash() {
// window.history.pushState('', document.title, window.location.pathname + window.location.search);
// }

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
      throw new Error('Network response was not ok.');
    })
    .catch(error => {
      console.log('A problem with the fetch operation: ', error.message);
    });
}
