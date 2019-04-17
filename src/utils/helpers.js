export const tokenRequestBaseURL = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=3c83236ef96f48d5bc012c6b1c75799e';

export const listingRequestBaseURL = 'https://cloud-api.yandex.net/v1/disk/resources';

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

export function getListingRequestURL(path) {
  return `${listingRequestBaseURL}?path=${path}`;
}

export function requestLogin() {
  window.location.replace(tokenRequestBaseURL);
}

export function requestListing(url, token) {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `OAuth ${token}`);

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

// export async function receiveListing(token) {
//   try {

//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
