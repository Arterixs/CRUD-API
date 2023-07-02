export const isValidUrl = (url: string[] | undefined) => {
  if (url?.at(1) === 'api' && url.at(2) === 'users' && url.length < 5) {
    return true;
  }
  return false;
};
