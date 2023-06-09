const baseUrl = "https://app.ticketmaster.com/discovery/v2/events";
const appKey = "7elxdku9GGG5k8j0Xm8KWdANDgecHMV0";

function handleError(e) {
  if (!e.ok) {
    throw new Error(e.statusText);
  }
  return e;
}

function baseFetch(query) {
  const url = `${baseUrl}/?apikey=${appKey}${query}`;

  return fetch(url)
    .then(handleError)
    .then((res) => {
      if (res.status === 204) {
        return res;
      }
      return res.json();
    });
}
function serialize(obj) {
  return Object.keys(obj)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join("&");
}

export function get(params) {
  const query = params
    ? `&${serialize({
        ...params,
      })}`
    : "";
  return baseFetch(query);
}
