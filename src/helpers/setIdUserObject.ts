import { v4 as uuidv4 } from 'uuid';
import { ServerUser, User } from '../types/interface.js';

export const setIdUserObject = (user: User) => {
  const updateUser = JSON.parse(JSON.stringify(user)) as ServerUser;
  const userId = uuidv4();
  updateUser.id = userId;
  return { userId, updateUser };
};
