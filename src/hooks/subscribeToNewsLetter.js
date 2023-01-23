import { getLocalStorage, setLocalStorage } from "./localStorage";

export function subscribeToNewsLetter(email) {
  const subscribers = getLocalStorage("newsLetterSubscribers") || [];

  if (subscribers.includes(email)) return;

  const newSubscribers = [...subscribers, email];
  setLocalStorage("newsLetterSubscribers", newSubscribers);
}
