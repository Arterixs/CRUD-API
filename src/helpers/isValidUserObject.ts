import { User } from '../types/interface.ts';
import { isValidItemsHobbies } from './isValidItemHobbies.ts';

export const isValidUserObject = (user: unknown) => {
  if (typeof user === 'object' && user !== null && typeof user !== 'function' && !Array.isArray(user)) {
    const userCheck = user as User;
    const arrayCheck = [];
    if (Object.prototype.hasOwnProperty.call(userCheck, 'username') && typeof userCheck.username === 'string') {
      arrayCheck.push(true);
    }
    if (Object.prototype.hasOwnProperty.call(userCheck, 'age') && typeof userCheck.age === 'number') {
      arrayCheck.push(true);
    }
    if (
      Object.prototype.hasOwnProperty.call(userCheck, 'hobbies') &&
      Array.isArray(userCheck.hobbies) &&
      isValidItemsHobbies(userCheck.hobbies)
    ) {
      arrayCheck.push(true);
    }
    const isValid = arrayCheck.length === 3;
    return isValid;
  }
  return false;
};
