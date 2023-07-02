import { validate as uuidValidate } from 'uuid';

export const isValidUserId = (userId: string) => uuidValidate(userId);
