import { isValidUrl } from './isValidUrl.js';

export const isValidUrlPath = (
  clientUrl: string | undefined,
  clientMethod: string | undefined,
  urlPaths: string[] | undefined
) => {
  if (!clientUrl || !clientMethod || !isValidUrl(urlPaths)) {
    throw new Error();
  }
  return true;
};
