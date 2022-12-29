import { getLocalStorage } from "./localStorage";

export function fetchData(type) {
  const data = getLocalStorage(type);
  if (data) return data;

  return fetch(`../../data/json/${type}.json`)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return [];
    });
}
