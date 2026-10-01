import { WISH_SUBMISSION_KEY, WISH_STORAGE_EVENT } from './wish-model';

export const readWishSubmission = () => {
  try {
    return window.localStorage.getItem(WISH_SUBMISSION_KEY);
  } catch {
    return null;
  }
};

export const subscribeToWishSubmission = (notify: () => void) => {
  const notifyFromStorage = (event: StorageEvent) => {
    if (event.key === WISH_SUBMISSION_KEY || event.key === null) notify();
  };

  window.addEventListener('storage', notifyFromStorage);
  window.addEventListener(WISH_STORAGE_EVENT, notify);

  return () => {
    window.removeEventListener('storage', notifyFromStorage);
    window.removeEventListener(WISH_STORAGE_EVENT, notify);
  };
};
