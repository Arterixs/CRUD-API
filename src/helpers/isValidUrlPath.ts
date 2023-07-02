import { isValidUrl } from './isValidUrl.ts';

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
